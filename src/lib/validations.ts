import { z } from 'zod';

export const promptSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(10, { message: 'Prompt must be at least 10 characters' })
    .max(2000, { message: 'Prompt must be less than 2000 characters' })
    .refine(
      (val) => val.split(/\s+/).length >= 3,
      { message: 'Prompt must contain at least 3 words' }
    ),
});

export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Project name is required' })
    .max(100, { message: 'Project name must be less than 100 characters' }),
  prompt: z.string().optional(),
  html_content: z.string().optional(),
  customization: z.any().optional(),
});

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Product name is required' })
    .max(100, { message: 'Product name must be less than 100 characters' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Description is required' })
    .max(500, { message: 'Description must be less than 500 characters' }),
  price: z
    .number()
    .min(0, { message: 'Price must be positive' })
    .max(999999, { message: 'Price is too high' }),
});

export const storeSchema = z.object({
  storeName: z
    .string()
    .trim()
    .min(1, { message: 'Store name is required' })
    .max(100, { message: 'Store name must be less than 100 characters' }),
  products: z.array(productSchema).min(1, { message: 'At least one product is required' }),
});
