// Backend-matching TypeScript types
// These mirror the Mongoose models in backend/src/models/

export type Category = 'sofas' | 'curtains' | 'majlis';

export interface ApiProduct {
  _id: string;
  category: Category;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  images: string[]; // backend uses images[] array
  price: number | null;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiGalleryPhoto {
  _id: string;
  category: Category;
  image: string; // backend GalleryPhoto uses single image string
  caption: { en: string; ar: string };
  createdAt: string;
  updatedAt: string;
}

export interface ApiReview {
  _id: string;
  name: { en: string; ar: string };
  text: { en: string; ar: string };
  location: { en: string; ar: string };
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  message: string;
}
