import { z } from 'zod';

export const updateSchema = z.object({
  first_name: z.string().min(1).max(50).optional(),
  last_name: z.string().min(1).max(50).optional(),
  birth_date: z.string().transform((value) => new Date(value)).refine(date => !isNaN(date.valueOf()), {
    message: "Invalid date format",
  }).optional(),
  address: z.string().min(1).max(255).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(100).optional(),
  password_confirmation: z.string().min(8).max(100).optional(),
  about: z.string().max(500).optional(),
  profil_picture: z.string().url().optional(),
});