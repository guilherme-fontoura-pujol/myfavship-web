import { api } from "../api/client";
import type { DashboardResponse } from "../types/dashboard";

export async function getDashboard(): Promise<DashboardResponse> {
  const response = await api.get<DashboardResponse>(
    "/api/public/rankings/dashboard"
  );

  return response.data;
}