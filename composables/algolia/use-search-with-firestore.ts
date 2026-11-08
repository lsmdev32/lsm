import { limit, query, where } from "firebase/firestore";

import { getCollectionRef } from "~/lib/firestore-model";

export function useSearchWithFirestore(index: string, q: Ref<string>) {
  const firestore = useFirestore();

  const algoliaResult = useSearch(index, q, ["slug"]);
  const hits = algoliaResult.result?.value?.hits ?? [];

  const queries = computed(() =>
    q.value === ""
      ? [
          where(
            "slug",
            "in",
            hits.map((e) => e.slug)
          ),
        ]
      : []
  );

  const firestoreQuery = query(
    getCollectionRef(firestore, "staff"),
    ...queries.value,
    limit(30)
  );

  const firestoreResult = useCollection(firestoreQuery);

  return {
    result: firestoreResult.data,
    isLoading: computed(
      () => algoliaResult.isLoading.value || firestoreResult.pending.value
    ),
    refresh: algoliaResult.refresh,
  };
}
