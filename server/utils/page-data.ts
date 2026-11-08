import { algoliasearch } from "algoliasearch";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

import type { PageDataServices } from "~/server/services/page-data/types";

export function createPageDataServices(): PageDataServices {
  return {
    firestore: getFirestore(),
    rtdb: getDatabase(),
    algoliaClient: algoliasearch(
      process.env.NUXT_PUBLIC_ALGOLIA_APP_ID ?? "",
      process.env.NUXT_PUBLIC_ALGOLIA_API_KEY ?? ""
    ),
  };
}

export function pageDataResponse<T>(data: T) {
  return {
    message: "ok",
    status: 200,
    data,
  };
}
