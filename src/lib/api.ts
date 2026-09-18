import type { ApiProduct, ApiGalleryPhoto, ApiReview, ContactFormData } from '@/types/api';

// Base URL from env — falls back to localhost if env is not set
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic fetch helper with error handling
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { message?: string }).message || `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ── Products ──────────────────────────────────────────────────────────────────

/** Fetch all products, optionally filtered by category */
export function getProducts(category?: string): Promise<ApiProduct[]> {
  const query = category ? `?category=${category}` : '';
  return apiFetch<ApiProduct[]>(`/products${query}`);
}

/** Fetch featured products only */
export function getFeaturedProducts(): Promise<ApiProduct[]> {
  return apiFetch<ApiProduct[]>('/products?featured=true');
}

// ── Gallery ───────────────────────────────────────────────────────────────────

/** Fetch all gallery photos, optionally filtered by category */
export function getGalleryPhotos(category?: string): Promise<ApiGalleryPhoto[]> {
  const query = category ? `?category=${category}` : '';
  return apiFetch<ApiGalleryPhoto[]>(`/gallery${query}`);
}

// ── Reviews ───────────────────────────────────────────────────────────────────

/** Fetch all reviews / testimonials */
export function getReviews(): Promise<ApiReview[]> {
  return apiFetch<ApiReview[]>('/reviews');
}

// ── Contact ───────────────────────────────────────────────────────────────────

/** Submit a contact message — returns the saved message object */
export function submitContact(data: ContactFormData): Promise<{ message: string }> {
  return apiFetch<{ message: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
