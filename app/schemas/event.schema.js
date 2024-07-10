import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  start_date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  finish_date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  start_hour: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/), // pour s'assurer que c'est une heure valide au format HH:MM:SS
  address: z.string().nonempty(),
  location: z.tuple([z.number(), z.number()]), // pour s'assurer que c'est un point valide
  privacy_type: z.boolean().default(false),
  picture: z.string().optional(),
  max_attendee: z.number().int().nonnegative(),
  status: z.boolean().default(false),
  pmr_access: z.boolean().default(false),
  zip_code_city: z.string().nonempty(),
  user_id: z.number().int()
});