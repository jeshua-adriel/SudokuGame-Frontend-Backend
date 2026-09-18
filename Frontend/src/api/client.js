const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/$/, "");

async function request(path, options = {}) {
  const token = localStorage.getItem("access_token");
  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...options.headers,
  };

  const isPublicAuthRequest = ["/users/login/", "/users/register/"].includes(path);
  if (token && !isPublicAuthRequest) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let detail = res.statusText || "Request failed";
    try {
      const body = await res.json();
      detail = body.detail || Object.values(body).flat().join(" ") || detail;
    } catch {
      // Keep the HTTP status text when the response has no JSON body.
    }
    throw new Error(`API error (${res.status}): ${detail}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  registerUser: (payload) =>
    request("/users/register/", { method: "POST", body: JSON.stringify(payload) }),

  loginUser: (payload) =>
    request("/users/login/", { method: "POST", body: JSON.stringify(payload) }),

  getPlayer: (id) => request(`/users/${id}/`),

  getCurrentPlayer: () => request("/users/me/"),

  getPuzzle: (difficulty) =>
    request(`/game/puzzle/${difficulty}/`),

  submitScore: (payload) =>
    request("/game/scores/", { method: "POST", body: JSON.stringify(payload) }),

  getLeaderboard: (difficulty) =>
    request(`/game/leaderboard/${difficulty ? `?difficulty=${difficulty}` : ""}`),
};
