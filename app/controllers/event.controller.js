import { Op } from 'sequelize';
import sequelize from '../config/pg.client.js';
import { Event } from '../models/index.model.js';
import { eventSchema } from '../schemas/event.schema.js';

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
  const { latitude, longitude, searchfield, searchtext} = req.query;

  if (latitude && longitude) {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }

    const radius = 50000; // 50 km in meters

    try {
      const eventsWithinRadiusQuery = `
        SELECT *, 
        ST_Distance(
          ST_GeogFromText('SRID=4326;POINT(${lat} ${lon})'),
          event.location
        ) AS distance
        FROM event 
        WHERE 
        ST_Distance(
          ST_GeogFromText('SRID=4326;POINT(${lat} ${lon})'),
          event.location
        ) <= ${radius}
        ORDER BY distance ASC;
      `;

      const eventsWithinRadius = await sequelize.query(eventsWithinRadiusQuery, { type: sequelize.QueryTypes.SELECT });
      return res.status(200).json(eventsWithinRadius);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else if (searchfield && searchtext) {
    try {
      const events = await Event.findAll({
        where: {
          [searchfield]: {
            [Op.iLike]: `%${searchtext}%`
          }
        }
      });
      return res.status(200).json(events);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: 'Search field and text are required' });
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
