import { api } from "../api/client";
import type {
  DashboardShip,
  DashboardWork,
} from "../types/dashboard";

export async function getTopShips(): Promise<DashboardShip[]> {
  const response = await api.get<DashboardShip[]>(
    "/api/public/rankings/top-ships"
  );

  return response.data;
}

export async function getTopWorks(): Promise<DashboardWork[]> {
  const response = await api.get<DashboardWork[]>(
    "/api/public/rankings/top-works"
  );

  return response.data;
}