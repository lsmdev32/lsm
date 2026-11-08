# Content listing and search read Algolia; detail reads Firestore

The blog and publication listing pages, their filters, and the dashboard admin tables all query an Algolia index named `contents`. Content detail pages bypass Algolia and load the document from Firestore by slug.

We did this because listing needs full-text search, faceting by category/author, year range filters, and pagination over the whole corpus — all of which Firestore cannot do without denormalising and client-side merging. Detail pages need the full body and freshness, so they read the source of truth.

Consequence: two stores hold the same entity, and nothing in this repository writes to the Algolia index — it is populated outside the repo (Firebase extension or manual sync), so index drift is invisible to the code. Listing responses also carry Algolia-shaped timestamps (`{_seconds, _nanoseconds}`), which is why admin row types differ from the Firestore models.
