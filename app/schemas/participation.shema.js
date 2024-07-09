import { z } from 'zod';

export const participationSchema = z.object({
  approval: z.boolean().default(false),
  user_id: z.number().int(),
  event_id: z.number().int(),
});