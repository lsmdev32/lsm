import { getDocs, limit, orderBy, query } from "firebase/firestore";

import { getCategoryCollectionRef } from "~/lib/firestore-model";

import type { PageDataServices } from "./types";

interface CategoriesPageData {
  categories: { id: string; name: string }[];
  total: number;
}

export async function getCategoriesPageData({
  firestore,
}: PageDataServices): Promise<CategoriesPageData> {
  const categorySnapshot = await getDocs(
    query(
      getCategoryCollectionRef(firestore),
      limit(30),
      orderBy("name", "asc")
    )
  );

  return {
    categories: categorySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
    total: categorySnapshot.size,
  };
}
