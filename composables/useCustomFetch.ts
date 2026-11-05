export default async function useCustomFetch(path: `/api/${string}`) {
  const data = await useFetch<Record<string, unknown>>(path);

  return {
    data: data.data.value,
    isLoading: data.status.value === "pending",
  };
}
