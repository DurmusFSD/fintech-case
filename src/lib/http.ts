import { getToken } from "./token";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ApiResult<T> = { success: boolean; data?: T; message?: string };

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { auth?: boolean } = {}
): Promise<ApiResult<T>> {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not set in .env.local");
  }

  const { auth = true, headers, ...rest } = options;

  const h = new Headers(headers);
  if (!h.has("Content-Type")) h.set("Content-Type", "application/json");

  if (auth) {
    const token = getToken();
    if (token) h.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: h,
    cache: "no-store",
  });


  const text = await res.text();
  const json = text ? JSON.parse(text) : {};


  if (!res.ok) {
    console.log("API ERROR:", {
      url: `${BASE_URL}${path}`,
      status: res.status,
      response: json,
    });

    const msg =
      json?.message ||
      json?.error ||
      json?.data?.message ||
      json?.details?.[0]?.message ||
      json?.errors?.[0]?.message ||
      "Request failed";

    return { success: false, message: msg };
  }



  return json as ApiResult<T>;
}
