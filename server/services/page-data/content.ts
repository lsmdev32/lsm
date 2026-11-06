import dayjs from "dayjs";
import { getDocs, limit, query, where } from "firebase/firestore";

import {
  getBlogCollectionRef,
  getPublicationCollectionRef,
} from "~/lib/firestore-model";

import { replaceInlineArticleImages } from "./article-images";
import { getCategoryName, getStaffData } from "./helpers";
import type { ContentSource, StaffRecord } from "./helpers";
import type { PageDataServices } from "./types";

interface ContentAuthor {
  id: string;
  name: string;
  slug: string;
  image_url: string;
}

interface ContentDetail {
  id: string;
  title: string;
  slug: string;
  image_url: string | null;
  published_at: string;
  category: string | null;
  content: string;
  tags: string[];
  type: string;
  publication_file_url?: string;
  author?: ContentAuthor | null;
}

interface RelatedContent {
  id: string;
  title: string;
  slug: string;
  image_url: string | null;
  category: string | null;
  published_at: string;
  author_id: string | null;
  author: ContentAuthor | null;
}

interface ContentDetailPageData {
  detail: ContentDetail;
  related_contents: RelatedContent[];
}

interface AlgoliaContent {
  id: string;
  type: string;
  slug: string;
  image_url?: string | null;
  title: string;
  category: string | null;
  published_at: string;
  author: ContentAuthor | null;
}

interface ContentListPageData {
  contents: AlgoliaContent[];
  page: number;
  total: number;
}

interface ContentListQuery {
  type: "blog" | "publication";
  page: number;
  search?: string;
  category?: string;
  year?: string;
}

interface AlgoliaHit {
  objectID: string;
  type: string;
  slug: string;
  cover_image_url?: string | null;
  title: string;
  category_id?: string | null;
  published_at: { _seconds: number };
  author_id?: string | null;
}

function toContentAuthor(staff: StaffRecord): ContentAuthor {
  return {
    id: staff.id,
    name: staff.fullname,
    image_url: staff.profile_picture_url,
    slug: staff.slug,
  };
}

/** Unique, non-empty ids in first-seen order. */
function uniqueIds(values: (string | null | undefined)[]): string[] {
  const ids = new Set<string>();

  for (const value of values) {
    if (value !== null && value !== undefined && value !== "") {
      ids.add(value);
    }
  }

  return [...ids];
}

async function resolveCategoryNames(
  firestore: PageDataServices["firestore"],
  categoryIds: string[]
): Promise<Map<string, string | null>> {
  const entries = await Promise.all(
    categoryIds.map(async (categoryId) => {
      const name = await getCategoryName(firestore, categoryId);

      return [categoryId, name] as const;
    })
  );

  return new Map(entries);
}

async function resolveAuthors(
  firestore: PageDataServices["firestore"],
  authorIds: string[]
): Promise<Map<string, ContentAuthor>> {
  const entries = await Promise.all(
    authorIds.map(async (authorId) => {
      const staff = await getStaffData(firestore, authorId);
      const author = staff === null ? null : toContentAuthor(staff);

      return [authorId, author] as const;
    })
  );

  return new Map(
    entries.filter(
      (entry): entry is readonly [string, ContentAuthor] => entry[1] !== null
    )
  );
}

function toRelatedContent(id: string, data: ContentSource): RelatedContent {
  return {
    id,
    title: data.title,
    slug: data.slug,
    image_url: data.cover_image_url,
    category: data.category_id ?? null,
    published_at: dayjs(data.published_at).format("MMM D, YYYY HH:mm"),
    author_id: data.author_id ?? null,
    author: null,
  };
}

async function enrichRelatedContents(
  firestore: PageDataServices["firestore"],
  relatedContents: RelatedContent[]
): Promise<void> {
  const categoryNames = await resolveCategoryNames(
    firestore,
    uniqueIds(relatedContents.map((content) => content.category))
  );

  const authors = await resolveAuthors(
    firestore,
    uniqueIds(relatedContents.map((content) => content.author_id))
  );

  for (const content of relatedContents) {
    if (content.category !== null) {
      content.category =
        categoryNames.get(content.category) ?? content.category;
    }

    if (content.author_id !== null) {
      content.author = authors.get(content.author_id) ?? null;
    }
  }
}

export async function getBlogDetailPageData(
  { firestore }: PageDataServices,
  slug: string
): Promise<ContentDetailPageData | null> {
  const blogSnapshot = await getDocs(
    query(
      getBlogCollectionRef(firestore),
      where("type", "==", "blog"),
      where("slug", "==", slug),
      limit(1)
    )
  );

  const blogDoc = blogSnapshot.docs.at(0);

  if (blogDoc === undefined) {
    return null;
  }

  const blogData = blogDoc.data();

  if (blogData.status !== "published") {
    return null;
  }

  const authorData = await getStaffData(firestore, blogData.author_id ?? null);

  const categoryName = await getCategoryName(firestore, blogData.category_id);

  const detail: ContentDetail = {
    id: blogDoc.id,
    title: blogData.title,
    slug: blogData.slug,
    image_url: blogData.cover_image_url,
    published_at: dayjs(blogData.published_at).format("MMM D, YYYY HH:mm"),
    category: categoryName ?? blogData.category_id,
    content: replaceInlineArticleImages(blogData.content, "blogs", blogDoc.id),
    tags: blogData.tags,
    type: blogData.type,
    author: authorData === null ? null : toContentAuthor(authorData),
  };

  const relatedContentsSnapshot = await getDocs(
    query(
      getBlogCollectionRef(firestore),
      where("category_id", "==", blogData.category_id),
      where("status", "==", "published"),
      where("slug", "!=", blogData.slug),
      limit(3)
    )
  );

  const relatedContents = relatedContentsSnapshot.docs.map((doc) =>
    toRelatedContent(doc.id, doc.data())
  );

  await enrichRelatedContents(firestore, relatedContents);

  return {
    detail,
    related_contents: relatedContents,
  };
}

export async function getPublicationDetailPageData(
  { firestore }: PageDataServices,
  slug: string
): Promise<ContentDetailPageData | null> {
  const publicationSnapshot = await getDocs(
    query(
      getPublicationCollectionRef(firestore),
      where("type", "==", "publication"),
      where("status", "==", "published"),
      where("slug", "==", slug),
      limit(1)
    )
  );

  const publicationDoc = publicationSnapshot.docs.at(0);

  if (publicationDoc === undefined) {
    return null;
  }

  const publicationData = publicationDoc.data();

  if (publicationData.status !== "published") {
    return null;
  }

  const authorData = await getStaffData(
    firestore,
    publicationData.author_id ?? null
  );

  const categoryName = await getCategoryName(
    firestore,
    publicationData.category_id
  );

  const detail: ContentDetail = {
    id: publicationDoc.id,
    title: publicationData.title,
    slug: publicationData.slug,
    image_url: publicationData.cover_image_url,
    published_at: dayjs(publicationData.published_at).format(
      "MMM D, YYYY HH:mm"
    ),
    category: categoryName ?? publicationData.category_id,
    content: replaceInlineArticleImages(
      publicationData.content,
      "publications",
      publicationDoc.id
    ),
    tags: publicationData.tags,
    type: publicationData.type,
    publication_file_url: publicationData.publication,
    author: authorData === null ? null : toContentAuthor(authorData),
  };

  const relatedContentsSnapshot = await getDocs(
    query(
      getPublicationCollectionRef(firestore),
      where("category_id", "==", publicationData.category_id),
      where("type", "==", "publication"),
      where("status", "==", "published"),
      where("slug", "!=", publicationData.slug),
      limit(3)
    )
  );

  const relatedContents = relatedContentsSnapshot.docs.map((doc) =>
    toRelatedContent(doc.id, doc.data())
  );

  await enrichRelatedContents(firestore, relatedContents);

  return {
    detail,
    related_contents: relatedContents,
  };
}

export async function getContentListPageData(
  { firestore, algoliaClient }: PageDataServices,
  input: ContentListQuery
): Promise<ContentListPageData> {
  const facetFilters = ["status:published", `type:${input.type}`];

  if (input.category !== undefined && input.category !== "") {
    facetFilters.push(`category_id:${input.category}`);
  }

  const numericFilters: string[] = [];

  if (input.year !== undefined && input.year !== "") {
    const startOfYear = dayjs(`${input.year}-01-01`).startOf("year").unix();
    const endOfYear = dayjs(`${input.year}-12-31`).endOf("year").unix();

    numericFilters.push(
      `published_at._seconds >= ${startOfYear}`,
      `published_at._seconds <= ${endOfYear}`
    );
  }

  const contentSnapshot = await algoliaClient.searchSingleIndex<AlgoliaHit>({
    indexName: "contents",
    searchParams: {
      query: input.search,
      facetFilters,
      hitsPerPage: 10,
      page: input.page - 1,
      numericFilters,
    },
  });

  if (contentSnapshot.hits.length === 0) {
    return {
      contents: [],
      page: 1,
      total: 0,
    };
  }

  const categoryNames = await resolveCategoryNames(
    firestore,
    uniqueIds(contentSnapshot.hits.map((hit) => hit.category_id ?? null))
  );

  const authors = await resolveAuthors(
    firestore,
    uniqueIds(contentSnapshot.hits.map((hit) => hit.author_id ?? null))
  );

  const contents: AlgoliaContent[] = contentSnapshot.hits.map((hit) => {
    const categoryId = hit.category_id ?? null;
    const authorId = hit.author_id ?? null;

    return {
      id: hit.objectID,
      type: hit.type,
      slug: hit.slug,
      image_url: hit.cover_image_url,
      title: hit.title,
      category:
        categoryId === null
          ? null
          : (categoryNames.get(categoryId) ?? categoryId),
      published_at: dayjs(hit.published_at._seconds * 1000).format(
        "MMM D, YYYY HH:mm"
      ),
      author: authorId === null ? null : (authors.get(authorId) ?? null),
    };
  });

  return {
    contents,
    page: input.page,
    total: contentSnapshot.nbHits ?? 0,
  };
}
