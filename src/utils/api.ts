export default async function apiFetch(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem("access_token");
    if (!token) {
        throw new Error("Токен не найден. Пожалуйста, авторизуйтесь.");
    }

    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {}),
        },
    });


    const data = res.status !== 204 ? await res.json() : null;

    if (!res.ok) {
        throw new Error(data?.message || "Ошибка при выполнении запроса к API");
    }
    return data;
}