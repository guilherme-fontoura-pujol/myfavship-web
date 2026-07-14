import { api } from "../api/client";
import type { SearchResponse } from "../types/search";

export async function searchAll(
  query: string
): Promise<SearchResponse> {
  const response = await api.get<SearchResponse>(
    "/api/public/search",
    {
      params: {
        q: query,
        limit: 5,
      },
    }
  );

  return response.data;
}