export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("access_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    localStorage.removeItem("access_token");
    throw new Error("Unauthorized, please login again");
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Ошибка API");
  return data;
};
