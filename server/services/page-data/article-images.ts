const INLINE_IMAGE_PATTERN =
  /src=(?<quote>["'])data:image\/(?<mime>[a-zA-Z0-9.+-]+);base64,(?<base64>[^"']+)\k<quote>/gu;

export type ArticleImageCollection = "blogs" | "publications";

interface InlineArticleImage {
  mime: string;
  base64: string;
}

export function replaceInlineArticleImages(
  content: string,
  collection: ArticleImageCollection,
  id: string
): string {
  let index = 0;

  return content.replaceAll(INLINE_IMAGE_PATTERN, (_match, quote: string) => {
    const url = `/api/page-data/images/${collection}/${id}/${index}`;
    index += 1;

    return `src=${quote}${url}${quote}`;
  });
}

export function extractInlineArticleImages(
  content: string
): InlineArticleImage[] {
  const images: InlineArticleImage[] = [];

  for (const match of content.matchAll(INLINE_IMAGE_PATTERN)) {
    const { mime, base64 } = match.groups ?? {};

    if (mime !== undefined && base64 !== undefined) {
      images.push({ mime, base64 });
    }
  }

  return images;
}
