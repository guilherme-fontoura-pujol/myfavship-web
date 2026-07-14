import { api } from "../api/client";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

export async function registerUser(
  data: RegisterRequest
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/api/auth/register",
    data
  );

  return response.data;
}

export async function login(
  credentials: LoginRequest
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/api/auth/login",
    credentials
  );

  return response.data;
}