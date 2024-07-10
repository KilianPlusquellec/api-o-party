import { z } from 'zod';

export const registerSchema = z.object({
  first_name: z.string().min(1).max(50),
  last_name: z.string().min(1).max(50),
  birth_date: z.string().transform((value) => new Date(value)).refine(date => !isNaN(date.valueOf()), {
    message: "Invalid date format",
  }),
  address: z.string().min(1).max(255),
  email: z.string().email().nonempty(),
  password: z.string().min(8).max(100).nonempty(),
  password_confirmation: z.string().min(8).max(100).nonempty(),
  about: z.string().max(500).optional(),
  profil_picture: z.string().url().optional(),
});


export const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});