import { z } from 'zod';
import { Event } from '../models/index.model.js';

const eventSchema = z.object({
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
});

export default {

//-------CREER UN EVENEMENT -------------------------------------------------------------------------------------------------//

  async createEvent(req, res) {

    try {
      const validatedData = eventSchema.parse(req.body);

      const event = await Event.create(validatedData);
      
      res.status(201).json(event);
    
    } catch (error) {
      res.status(400).json({ error });
    }
  },

//-------TROUVER DES EVENEMENTS PRES DE CHEZ SOI----------------------------------------------------------------------------//

async getEvent(req, res) {

    const { latitude, longitude } = req.query;
    const pointWKT = `SRID=4326;POINT(${latitude}${longitude})`; // Formattage de la chaîne WKT  (Well-Known Text)
  
    try {
      
      const events = await Event.findAll({
      
        // attributes: {
        //   include: [
        //     [
        //       Sequelize.fn(
        //         'ST_Distance',
        //         Sequelize.col('location'),
        //         Sequelize.fn('ST_GeogFromText', pointWKT)
        //       ),
        //       'distance'
        //     ]
        //   ]
        // },
      
        // where: Sequelize.where(
        //   Sequelize.fn(
        //     'ST_DWithin', //pour déterminer si deux objets géométriques sont à une distance spécifique ou inférieure l'un de l'autre.
        //     Sequelize.col('location'),
        //     Sequelize.fn('ST_GeogFromText', pointWKT),  // Retourne la localisation
        //     200000 // Dans un rayon de 200 km (200 000 mètres)
        //   ),
        //   true
        // ),
      
        // order: Sequelize.literal('distance')
      
      });

      if (!events) {
        return res.status(404).json({ error: 'Events not found' });
      }
  
      res.status(200).json(events);

    } catch (error) {
      res.status(400).json({ error });
    }
  },
  
//-------TROUVER UN EVENEMENT ----------------------------------------------------------------------------------------------------//

  async getOneEvent(req, res) {
    
    try {
    
      const event = await Event.findByPk(req.params.id);
    
      
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      } 
      
      return res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  
  //-------MODIFIER UN EVENEMENT -------------------------------------------------------------------------------------------------//

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

  //-------SUPPRIMER UN EVENEMENT ------------------------------------------------------------------------------------------------//

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
