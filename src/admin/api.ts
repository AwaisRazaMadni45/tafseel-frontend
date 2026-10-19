// Admin panel API — uses same VITE_API_URL as the main frontend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken(): string | null {
  return localStorage.getItem('tafseel_admin_token');
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { message?: string }).message || `Request failed (${res.status})`);
  return data;
}

export const loginAdmin = (username: string, password: string) =>
  request('/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) });

export const getProducts = () => request('/products');
export const createProduct = (data: unknown) =>
  request('/products', { method: 'POST', body: JSON.stringify(data) });
export const updateProduct = (id: string, data: unknown) =>
  request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProduct = (id: string) =>
  request(`/products/${id}`, { method: 'DELETE' });

export const getGalleryPhotos = () => request('/gallery');
export const createGalleryPhoto = (data: unknown) =>
  request('/gallery', { method: 'POST', body: JSON.stringify(data) });
export const deleteGalleryPhoto = (id: string) =>
  request(`/gallery/${id}`, { method: 'DELETE' });

export const getReviews = () => request('/reviews');
export const createReview = (data: unknown) =>
  request('/reviews', { method: 'POST', body: JSON.stringify(data) });
export const deleteReview = (id: string) =>
  request(`/reviews/${id}`, { method: 'DELETE' });

export const getOrders = () => request('/orders');
export const createOrder = (data: unknown) =>
  request('/orders', { method: 'POST', body: JSON.stringify(data) });
export const deleteOrder = (id: string) =>
  request(`/orders/${id}`, { method: 'DELETE' });

export const getContactMessages = () => request('/contact');

export const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  return request('/upload', { method: 'POST', body: formData }) as Promise<{ url: string }>;
};
