import { z } from 'zod';
import { Event } from '../models/index.models.js';

const eventSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  start_date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  finish_date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  start_hour: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/), // Assurez-vous que c'est une heure valide au format HH:MM:SS
  address: z.string().nonempty(),
  location: z.tuple([z.number(), z.number()]), // Assurez-vous que c'est un point valide
  privacy_type: z.boolean().default(false),
  picture: z.string().optional(),
  max_attendee: z.number().int().nonnegative(),
  status: z.boolean().default(false),
  pmr_access: z.boolean().default(false),
});

export default {

  async createEvent(req, res) {

    try {
      const validatedData = eventSchema.parse(req.body);

      const event = await Event.create(validatedData);
      
      res.status(201).json(event);
    
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  async getEvent(req, res) {

    try {
    
      const events = await Event.findAll();
    
      res.status(200).json(events);
    
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  async getOneEvent(req, res) {
    
    try {
    
      const event = await Event.findByPk(req.params.id);
    
      res.status(200).json(event);
    
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  async updateEvent(req, res) {
    
    try {
    
      const validatedData = eventSchema.parse(req.body);
      const event = await Event.findByPk(req.params.id);
    
      if(!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      await event.update(validatedData);
    
      res.status(200).json(event);
    
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  
  async deleteEvent(req, res) {
    
    try {
    
      const event = await Event.findByPk(req.params.id);

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
    
      await event.destroy();
    
      res.status(204).end();
    
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};