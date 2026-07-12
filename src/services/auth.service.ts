import { api } from "../api/client";
import type {
  AuthResponse,
  LoginRequest,
} from "../types/auth";

export async function login(
  credentials: LoginRequest
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/api/auth/login",
    credentials
  );

  return response.data;
}