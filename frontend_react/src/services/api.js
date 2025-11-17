const ENV = {
  base: process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL,
};

async function request(path, init) {
  if (!ENV.base) {
    const { mockApi } = await import('./mockData');
    return mockApi.request(path, init);
  }
  const url = `${ENV.base}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...(init || {}),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function fetchRecipes(params) {
  /** Fetch list of recipes with optional filters; falls back to mock data if no backend configured. */
  const query = new URLSearchParams();
  if (params?.q) query.set('q', params.q);
  if (params?.cuisine) query.set('cuisine', params.cuisine);
  if (params?.tags && params.tags.length) query.set('tags', params.tags.join(','));
  if (params?.page != null) query.set('page', String(params.page));
  if (params?.limit != null) query.set('limit', String(params.limit));
  return request(`/recipes?${query.toString()}`);
}

// PUBLIC_INTERFACE
export async function fetchRecipeById(id) {
  /** Fetch single recipe by ID; falls back to mock data if no backend configured. */
  return request(`/recipes/${id}`);
}

export const api = { fetchRecipes, fetchRecipeById };
