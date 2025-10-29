// Centralized TypeScript types for the entire application

export interface ProductImage {
  front?: string;
  back?: string;
  side?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: ProductImage;
}

export interface StoreData {
  storeName: string;
  products: Product[];
}

export interface Customization {
  primaryColor?: string;
  accentColor?: string;
  font?: 'modern' | 'classic' | 'playful';
  layout?: 'minimal' | 'bold' | 'elegant';
  paymentsEnabled?: boolean;
  media?: File[];
  addSection?: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  prompt?: string;
  customization?: Customization;
  html_content?: string;
  created_at: string;
  updated_at: string;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  category: string;
  thumbnail_url?: string;
  html_content: string;
  customization?: Customization;
  store_data?: StoreData;
  is_public: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface UserCredits {
  id: string;
  user_id: string;
  daily_credits: number;
  total_credits: number;
  last_reset_date: string;
  created_at: string;
  updated_at: string;
}

export interface GenerationRequest {
  prompt: string;
  model?: string;
}

export interface GenerationResponse {
  content: string;
  creditsUsed?: number;
  remainingCredits?: number;
}
