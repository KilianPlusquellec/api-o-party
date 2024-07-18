import { Op } from 'sequelize';
import sequelize from '../config/pg.client.js';
import { Event, Participation } from '../models/index.model.js';
import { eventSchema, updateEventSchema } from '../schemas/event.schema.js';

export default {

//-------CREER UN EVENEMENT -------------------------------------------------------------------------------------------------//

  async createEvent(req, res) {
    
       try {
      const locationGeoJSON = {
        type: "Point",
        coordinates: [req.body.location[1], req.body.location[0]]
      };

      const createEvent = {
        title: req.body.title,
        description: req.body.description,
        start_date: req.body.start_date,
        finish_date: req.body.finish_date,
        start_hour: req.body.start_hour,
        address: req.body.address,
        location: JSON.stringify(locationGeoJSON), // Convertir l'objet GeoJSON en chaîne
        privacy_type: req.body.privacy_type,
        picture: req.body.picture,
        max_attendee: req.body.max_attendee,
        status: req.body.status,
        pmr_access: req.body.pmr_access,
        zip_code_city: req.body.zip_code_city,
        user_id: req.body.user_id,
      };

      const validatedData = eventSchema.parse(createEvent);
      
      const event = await Event.create(validatedData);
      
      res.status(201).json(event);
    
    } catch (error) {
      res.status(400).json({ error : 'Invalid input'});
    }
  },

//-------TROUVER DES EVENEMENTS PRES DE CHEZ SOI----------------------------------------------------------------------------//

async getEvent(req, res) {
  const { latitude, longitude, radius: queryRadius, searchfield, searchtext} = req.query;

  if (latitude && longitude) {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }
    // L'utilisateur modifie la distance souhaitée, sinon par défaut elle est à 50km
    const radius = queryRadius ? parseFloat(queryRadius) : 50000 ;

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
      return res.status(400).json({ error: 'Invalid distance research' });
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
      return res.status(400).json({ error: 'Invalid research' });
    }
  } else {
    return res.status(400).json({ error: 'Invalid input' });
  }
},
  
//-------TROUVER UN EVENEMENT ----------------------------------------------------------------------------------------------------//
  
  async getOneEvent(req, res) {
    
    const eventId = parseInt(req.params.id);
    if (isNaN(eventId) || eventId < 1) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    try {
    
      const event = await Event.findByPk(eventId, {
        include: [{
          association: 'host',
          attributes: { exclude: ['password', 'password_confirmation'] }
        }],
      });
    
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      } 
      
      return res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ error : 'Invalid input'});
    }
  },

  //-------MODIFIER UN EVENEMENT -------------------------------------------------------------------------------------------------//

  async updateEvent(req, res) {
    
    try {
    
      //const validatedData = eventSchema.parse(updatedEvent);

      const event = await Event.findByPk(req.params.id, {
        include: [{
          association: 'host',
          attributes: { exclude: ['password', 'password_confirmation'] }
        }],
      });
      
      if(!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      // si le user n'est pas le créateur de l'event
      if( event.host.id !== req.user.id) {
        return res.status(404).json({ error: 'User has no permission to edit this event' });       
      }
      
      const updatedFields = {};

      if (req.body.title && req.body.title !== event.title) updatedFields.title = req.body.title;
      if (req.body.description && req.body.description !== event.description) updatedFields.description = req.body.description;
      if (req.body.start_date && req.body.start_date !== event.start_date) updatedFields.start_date = req.body.start_date;
      if (req.body.finish_date && req.body.finish_date !== event.finish_date) updatedFields.finish_date = req.body.finish_date;
      if (req.body.start_hour && req.body.start_hour !== event.start_hour) updatedFields.start_hour = req.body.start_hour;
      if (req.body.address && req.body.address !== event.address) updatedFields.address = req.body.address;
  
      // Envoie la location que si modifiée (on ne compare pas locationGeoJSON avec JSON.stringify car sinon, location est envoyée en réponse même si non modifiée )
      if (req.body.location) {
        const newCoordinates = [req.body.location[1], req.body.location[0]];
        const currentCoordinates = event.location.coordinates;
        if (newCoordinates[0] !== currentCoordinates[0] || newCoordinates[1] !== currentCoordinates[1]) {
          updatedFields.location = JSON.stringify({
            type: "Point",
            coordinates: newCoordinates
          });
        }
      }
      if (req.body.privacy_type !== undefined && req.body.privacy_type !== event.privacy_type) updatedFields.privacy_type = req.body.privacy_type;
      if (req.body.picture && req.body.picture !== event.picture) updatedFields.picture = req.body.picture;
      if (req.body.max_attendee && req.body.max_attendee !== event.max_attendee) updatedFields.max_attendee = req.body.max_attendee;
      if (req.body.status !== undefined && req.body.status !== event.status) updatedFields.status = req.body.status;
      if (req.body.pmr_access !== undefined && req.body.pmr_access !== event.pmr_access) updatedFields.pmr_access = req.body.pmr_access;
      if (req.body.zip_code_city && req.body.zip_code_city !== event.zip_code_city) updatedFields.zip_code_city = req.body.zip_code_city;
      if (req.body.user_id && req.body.user_id !== event.user_id) updatedFields.user_id = req.body.user_id;


      const validatedData = updateEventSchema.parse(updatedFields);
      
      
      await event.update(validatedData);
      
     res.status(200).json(validatedData);
    
    } catch (error) {
      res.status(400).json({ error: 'Invalid input' });
    }
  },

  //-------SUPPRIMER UN EVENEMENT ------------------------------------------------------------------------------------------------//

  async deleteEvent(req, res) {
    
    try {

      const eventId = req.params.id;
      const event = await Event.findByPk(eventId);

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
    
      await Participation.destroy({
        where: {
          event_id: eventId,
        },
      });
      
      await event.destroy();
    
      res.status(204).end();
    
    } catch (error) {
      res.status(400).json({ error: 'Invalid request' });
    }
  },
};
