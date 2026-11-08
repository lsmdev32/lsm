import type { Algoliasearch } from "algoliasearch";
import type { Database } from "firebase/database";
import type { Firestore } from "firebase/firestore";

export interface PageDataServices {
  firestore: Firestore;
  rtdb: Database;
  algoliaClient: Algoliasearch;
}

export interface StaffSummary {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  type: string;
  email: string;
  linkedin_url: string;
}

export interface ContentSummary {
  id: string;
  title: string;
  slug: string;
  image_url: string | null;
  published_at: string;
  category_id: string | null;
  author_id: string | null;
  category: string | null;
  author: { name: string; photo_url: string } | null;
}
