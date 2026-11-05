export default async function useCustomFetch<
  const Path extends `/rest/${string}`,
>(path: Path) {
  const data = await useFetch<Record<string, unknown>>(path);

  return {
    data: data.data.value,
    isLoading: data.status.value === "pending",
  };
}
