import { api } from "../api/client";
import type { ProfileResponse } from "../types/profile";

export async function getProfile(): Promise<ProfileResponse> {
  const response = await api.get<ProfileResponse>(
    "/api/public/profile/me"
  );

  return response.data;
}