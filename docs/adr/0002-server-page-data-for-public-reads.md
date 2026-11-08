# Public reads go through server endpoints; writes go through the client

The public site never reads Firestore directly. Every public page fetches from `/api/page-data/*`, where a Nitro route calls a page-data service that assembles a fully-resolved payload — categories and authors already joined by name, dates pre-formatted, inline base64 article images rewritten to URLs. Dashboard writes and admin list reads instead use the Firebase client SDK directly via `vuefire`.

We split the two directions because public reads need denormalised, join-free payloads and must hide drafts, while admin writes need optimistic client-side forms and live document bindings. Doing joins per-request on the server also keeps the client bundle free of resolution logic.

Consequence: the public side has no realtime behaviour — a published Content item appears only after a fresh navigation — and the "published only" rule is enforced independently in each page-data service rather than by security rules.
