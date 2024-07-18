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
  location: z.string().refine((data) => {
    try {
      const json = JSON.parse(data);
      return json.type === "Point" && Array.isArray(json.coordinates) && json.coordinates.length === 2;
    } catch {
      return false;
    }
  }, {
    message: "Invalid GeoJSON for location",
  }),
  privacy_type: z.boolean().default(false),
  picture: z.string().optional(),
  max_attendee: z.number().int().nonnegative(),
  status: z.boolean().default(false),
  pmr_access: z.boolean().default(false),
  zip_code_city: z.string().nonempty(),
  user_id: z.number().int()
});




export const updateEventSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  start_date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()).optional(),
  finish_date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()).optional(),
  start_hour: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).optional(), // pour s'assurer que c'est une heure valide au format HH:MM:SS
  address: z.string().optional(),
  location: z.string().refine((data) => {
    try {
      const json = JSON.parse(data);
      return json.type === "Point" && Array.isArray(json.coordinates) && json.coordinates.length === 2;
    } catch {
      return false;
    }
  }, {
    message: "Invalid GeoJSON for location",
  }).optional(),
  privacy_type: z.boolean().default(false).optional(),
  picture: z.string().optional(),
  max_attendee: z.number().int().nonnegative().optional(),
  status: z.boolean().default(false).optional(),
  pmr_access: z.boolean().default(false).optional(),
  zip_code_city: z.string().optional(),
  user_id: z.number().int().optional(),
});