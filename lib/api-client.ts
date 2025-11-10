const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || "An error occurred" }
    }

    return { data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An error occurred" }
  }
}

export const api = {
  auth: {
    register: (email: string, password: string, name: string) =>
      apiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      }),
    login: (email: string, password: string) =>
      apiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
  },
  products: {
    list: (query?: string, limit?: number) =>
      apiCall(
        `/products?${new URLSearchParams({ ...(query && { q: query }), ...(limit && { limit: limit.toString() }) }).toString()}`,
      ),
    get: (id: string) => apiCall(`/products/${id}`),
    create: (product: any) =>
      apiCall("/products", {
        method: "POST",
        body: JSON.stringify(product),
      }),
  },
  scans: {
    list: (userId: string, limit?: number) =>
      apiCall(`/scans?${new URLSearchParams({ userId, ...(limit && { limit: limit.toString() }) }).toString()}`),
    create: (scan: any) =>
      apiCall("/scans", {
        method: "POST",
        body: JSON.stringify(scan),
      }),
  },
  community: {
    posts: {
      list: (limit?: number, filter?: string) =>
        apiCall(
          `/community/posts?${new URLSearchParams({ ...(limit && { limit: limit.toString() }), ...(filter && { filter }) }).toString()}`,
        ),
      create: (post: any) =>
        apiCall("/community/posts", {
          method: "POST",
          body: JSON.stringify(post),
        }),
    },
  },
  users: {
    get: (id: string) => apiCall(`/users/${id}`),
    update: (id: string, user: any) =>
      apiCall(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(user),
      }),
  },
}
