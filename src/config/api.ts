const BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  post: <T>(path: string, body?: unknown, init?: RequestInit) =>
      request<T>(path, { method: "POST", body: body != null ? JSON.stringify(body) : undefined, ...init }),
};
