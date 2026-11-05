import dayjs from "dayjs";
import {
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import {
  getBlogCollectionRef,
  getCategoryDocRef,
  getPublicationCollectionRef,
} from "~/lib/firestore-model";

import { getCategoryName, getStaffData } from "./helpers";
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
  category: string;
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
  category: string;
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
  author:
    | string
    | {
        id: string;
        name: string;
        photo_url: string;
      }
    | null;
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

  if (blogSnapshot.empty) {
    return null;
  }

  const blogData = blogSnapshot.docs.at(0)?.data();

  if (!blogData || blogData.status !== "published") {
    return null;
  }

  const detail: ContentDetail = {
    id: blogData.id!,
    title: blogData.title,
    slug: blogData.slug,
    image_url: blogData.cover_image_url,
    published_at: dayjs(blogData.published_at.seconds * 1000).format(
      "MMM D, YYYY HH:mm"
    ),
    category: blogData.category_id,
    content: blogData.content,
    tags: blogData.tags || [],
    type: blogData.type,
  };

  if (blogData.author_id) {
    const authorData = await getStaffData(firestore, blogData.author_id);

    if (authorData) {
      detail.author = {
        id: authorData.id!,
        name: authorData.fullname,
        image_url: authorData.profile_picture_url,
        slug: authorData.slug,
      };
    }
  }

  if (blogData.category_id) {
    const categoryDoc = await getDoc(
      getCategoryDocRef(firestore, blogData.category_id)
    );

    if (categoryDoc.exists()) {
      const categoryData = categoryDoc.data();

      if (categoryData) {
        detail.category = categoryData.name;
      }
    }
  }

  const relatedContentsSnapshot = await getDocs(
    query(
      getBlogCollectionRef(firestore),
      where("category_id", "==", blogData.category_id),
      where("status", "==", "published"),
      where("slug", "!=", blogData.slug),
      limit(3)
    )
  );

  const relatedContents: RelatedContent[] = relatedContentsSnapshot.docs.map(
    (doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        image_url: data.cover_image_url,
        category: data.category_id,
        published_at: dayjs(data.published_at.seconds * 1000).format(
          "MMM D, YYYY HH:mm"
        ),
        author_id: data.author_id ?? null,
        author: null,
      };
    }
  );

  const relatedCategoryIds = [
    ...new Set(relatedContents.map((content) => content.category)),
  ].filter(Boolean);

  for (const categoryId of relatedCategoryIds) {
    const categoryName = await getCategoryName(firestore, categoryId);

    if (!categoryName) {
      continue;
    }

    for (const content of relatedContents) {
      if (content.category === categoryId) {
        content.category = categoryName;
      }
    }
  }

  const relatedAuthorIds = [
    ...new Set(relatedContents.map((content) => content.author_id)),
  ].filter(Boolean);

  for (const authorId of relatedAuthorIds) {
    const authorData = await getStaffData(firestore, authorId);

    if (!authorData) {
      for (const content of relatedContents) {
        if (content.author_id === authorId) {
          content.author = null;
        }
      }

      continue;
    }

    for (const content of relatedContents) {
      if (content.author_id === authorId) {
        content.author = {
          id: authorData.id!,
          name: authorData.fullname,
          image_url: authorData.profile_picture_url,
          slug: authorData.slug,
        };
      }
    }
  }

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

  if (publicationSnapshot.empty) {
    return null;
  }

  const publicationData = publicationSnapshot.docs.at(0)?.data();

  if (!publicationData || publicationData.status !== "published") {
    return null;
  }

  const detail: ContentDetail = {
    id: publicationData.id!,
    title: publicationData.title,
    slug: publicationData.slug,
    image_url: publicationData.cover_image_url,
    published_at: dayjs(publicationData.published_at.seconds * 1000).format(
      "MMM D, YYYY HH:mm"
    ),
    category: publicationData.category_id,
    content: publicationData.content,
    tags: publicationData.tags || [],
    type: publicationData.type,
    publication_file_url: publicationData.publication,
    author: null,
  };

  if (publicationData.author_id) {
    const authorData = await getStaffData(firestore, publicationData.author_id);

    if (authorData) {
      detail.author = {
        id: authorData.id!,
        name: authorData.fullname,
        image_url: authorData.profile_picture_url,
        slug: authorData.slug,
      };
    }
  }

  if (publicationData.category_id) {
    const categoryDoc = await getDoc(
      getCategoryDocRef(firestore, publicationData.category_id)
    );

    if (categoryDoc.exists()) {
      const categoryData = categoryDoc.data();

      if (categoryData) {
        detail.category = categoryData.name;
      }
    }
  }

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

  const relatedContents = relatedContentsSnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      image_url: data.cover_image_url,
      published_at: dayjs(data.published_at.seconds * 1000).format(
        "MMM D, YYYY HH:mm"
      ),
      category: null as string | null,
      author: null as ContentAuthor | null,
    };
  });

  const relatedCategoryIds = [
    ...new Set(relatedContents.map((content) => content.category_id)),
  ].filter(Boolean);

  for (const categoryId of relatedCategoryIds) {
    const categoryName = await getCategoryName(firestore, categoryId);

    if (!categoryName) {
      continue;
    }

    for (const content of relatedContents) {
      if (content.category_id === categoryId) {
        content.category = categoryName;
      }
    }
  }

  const relatedAuthorIds = [
    ...new Set(relatedContents.map((content) => content.author_id)),
  ].filter(Boolean);

  for (const authorId of relatedAuthorIds) {
    const authorData = await getStaffData(firestore, authorId);

    if (!authorData) {
      for (const content of relatedContents) {
        if (content.author_id === authorId) {
          content.author = null;
        }
      }

      continue;
    }

    for (const content of relatedContents) {
      if (content.author_id === authorId) {
        content.author = {
          id: authorData.id!,
          name: authorData.fullname,
          image_url: authorData.profile_picture_url,
          slug: authorData.slug,
        };
      }
    }
  }

  return {
    detail,
    related_contents: relatedContents,
  };
}

export async function getContentListPageData(
  { firestore, algoliaClient }: PageDataServices,
  input: ContentListQuery
): Promise<ContentListPageData> {
  const facetFilters = [
    "status:published",
    `type:${input.type}`,
    input.category ? `category_id:${input.category}` : "",
  ].filter(Boolean);

  const numericFilters: string[] = [];

  if (input.year) {
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

  const mappedContents: AlgoliaContent[] = contentSnapshot.hits.map((hit) => ({
    id: hit.objectID,
    type: hit.type,
    slug: hit.slug,
    image_url: hit.cover_image_url,
    title: hit.title,
    category: hit.category_id ?? null,
    published_at: dayjs(hit.published_at._seconds * 1000).format(
      "MMM D, YYYY HH:mm"
    ),
    author: hit.author_id ?? null,
  }));

  const mappedCategoryIds = [
    ...new Set(mappedContents.map((content) => content.category)),
  ].filter(Boolean);

  for (const categoryId of mappedCategoryIds) {
    const categoryName = await getCategoryName(firestore, categoryId);

    if (!categoryName) {
      continue;
    }

    for (const content of mappedContents) {
      if (content.category === categoryId) {
        content.category = categoryName;
      }
    }
  }

  const mappedAuthorIds = [
    ...new Set(mappedContents.map((content) => content.author)),
  ].filter(Boolean);

  for (const authorId of mappedAuthorIds) {
    const authorData = await getStaffData(firestore, authorId);

    if (!authorData) {
      for (const content of mappedContents) {
        if (content.author === authorId) {
          content.author = null;
        }
      }

      continue;
    }

    for (const content of mappedContents) {
      if (content.author === authorId) {
        content.author = {
          id: authorData.id!,
          name: authorData.fullname,
          photo_url: authorData.profile_picture_url,
        };
      }
    }
  }

  return {
    contents: mappedContents,
    page: input.page,
    total: contentSnapshot.nbHits,
  };
}
