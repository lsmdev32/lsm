# Blogs and Publications share one `contents` collection

Blogs and Publications are distinct Content types in the domain but live as documents in a single Firestore collection, `contents`, discriminated by a `type` field (`"blog"` | `"publication"`). The app still presents them through two typed ref helpers — `getBlogCollectionRef` and `getPublicationCollectionRef` — which return the *same* collection with different converters, and neither filters on `type` at the ref level; every caller must add its own `where("type", "==", …)`.

We chose one collection because both types share almost every field (title, slug, cover, category, tags, body, author, publication state, publication date) and the Algolia index, admin tables, and page-data services all iterate "content" uniformly. Publication-only fields (`publication`) sit unused on blogs.

Consequence: `getPublicationCollectionRef(firestore)` does not mean "publications". A query built on it without a `type` filter silently returns blogs too — for example a category cascade delete built on the publication ref would delete blogs sharing that category.
