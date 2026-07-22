import { getGetApiV10CategoryQueryKey } from "@/api/endpoints/category";
import baseConfig from "@/configs/base";
import { QueryClient } from "@tanstack/react-query";

export async function prefetchCategories(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: getGetApiV10CategoryQueryKey(),
    queryFn: async () => {
      const apiUrl = baseConfig.backendDomain;

      const res = await fetch(`${apiUrl}/api/v1.0/category`, {
        next: { revalidate: 30 },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch categories: ${res.status} ${res.statusText}`
        );
      }

      return res.json();
    },
  });

  return queryClient;
}

export async function prefetchLayoutData(queryClient: QueryClient) {
  await Promise.all([prefetchCategories(queryClient)]);

  return queryClient;
}
