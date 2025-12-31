import { apiFetch } from "@/lib/http";

export type RegisterInput = { email: string; password: string; name?: string };
export type LoginInput = { email: string; password: string };

export type LoginData = {
  accessToken?: string;
  token?: string;
  user?: { id?: string; email?: string; name?: string };
};

export function registerApi(payload: { name: string; email: string; password: string }) {
  return apiFetch(`/users/register`, {
    method: "POST",
    auth: false,
    body: JSON.stringify({
      fullName: payload.name,
      email: payload.email,
      password: payload.password,
    }),
  });
}



export function loginApi(payload: LoginInput) {
  return apiFetch<LoginData>(`/users/login`, {
    method: "POST",
    auth: false,
    body: JSON.stringify(payload),
  });
}
