type PageDataPrimitive = string | number | boolean | null;

type PageDataValue = PageDataPrimitive | PageDataValue[] | PageDataRecord;

interface PageDataRecord {
  [key: string]: PageDataValue;
}

/**
 * The envelope `server/utils/page-data.ts` wraps every `/api/page-data/*` payload in.
 */
interface PageDataResponse {
  message: string;
  status: number;
  data: PageDataRecord;
}

export default async function useCustomFetch(path: `/api/${string}`) {
  const data = await useFetch<PageDataResponse>(path);

  return {
    data: data.data.value,
    isLoading: data.status.value === "pending",
  };
}
