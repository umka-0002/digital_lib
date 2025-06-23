import { useAuth } from "../../app/AuthContext";

export function useAuthFetch() {
  const { access, refresh, logout, setAccess } = useAuth();

  // fetch с авторизацией
  const authFetch = async (input: RequestInfo, init: RequestInit = {}) => {
    const headers = new Headers(init.headers || {});
    if (access) headers.set("Authorization", `Bearer ${access}`);
    const requestInit = { ...init, headers };

    let response = await fetch(input, requestInit);

    // если access истёк, пробуем refresh
    if (response.status === 401 && refresh) {
      // получаем новый access
      const res = await fetch("/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });
      if (res.ok) {
        const data = await res.json();
        setAccess(data.access);
        localStorage.setItem("access", data.access);
        // повторяем запрос
        headers.set("Authorization", `Bearer ${data.access}`);
        response = await fetch(input, { ...init, headers });
      } else {
        logout();
      }
    }
    return response;
  };

  return authFetch;
}