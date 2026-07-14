import { api } from "../api/client";
import type {
  WorkDetails,
  WorkSummary,
} from "../types/work";

export async function getWorks(): Promise<WorkSummary[]> {
  const response = await api.get<WorkSummary[]>(
    "/api/public/works"
  );

  return response.data;
}

export async function getWorkBySlug(
  slug: string
): Promise<WorkDetails> {
  const response = await api.get<WorkDetails>(
    `/api/public/works/${slug}`
  );

  return response.data;
}