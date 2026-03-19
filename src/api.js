const DEFAULT_API_BASE = "http://localhost:5000";

export const API_BASE =
  (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_BASE_URL) ||
  DEFAULT_API_BASE;

async function request(path, { method = "GET", body } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let payload = null;
    try {
      payload = await res.json();
    } catch {
      // ignore
    }
    const msg = payload?.error || `HTTP_${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return await res.json();
}

export function fetchProducts({ q, location } = {}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (location) params.set("location", location);
  const qs = params.toString();
  return request(`/api/products${qs ? `?${qs}` : ""}`);
}

export function fetchProductById(id) {
  return request(`/api/products/${encodeURIComponent(id)}`);
}

export function createOrder({ productId, quantity, email }) {
  return request("/api/orders", { method: "POST", body: { productId, quantity, email } });
}

export function createOrderV2({ items, customer, shipping, note, paymentMethod }) {
  return request("/api/orders", {
    method: "POST",
    body: { items, customer, shipping, note, paymentMethod },
  });
}

