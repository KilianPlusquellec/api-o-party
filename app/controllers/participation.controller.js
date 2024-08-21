import { Event, Participation } from '../models/index.model.js';

//--------------DEMANDE DE PARTICIPATION A UN EVENT------------
  
export default {

  async approvalRequest(req, res) {
    try {
      const { id } = req.params; // ID de l'évènement à partir des paramètres de la route
      const userId = req.user.id; // ID de l'utilisateur à partir du token JWT
  
      // Je vérifie si l'événement existe
      const event = await Event.findByPk(id);
      if (!event) {
        return res.status(404).json({ message: 'event not found' });
      }
  
      // Je vérifie si l'utilisateur participe déjà à l'évènement
      const existingParticipation = await Participation.findOne({
        where: { user_id: userId, event_id: id }
      });
      if (existingParticipation) {
        return res.status(400).json({ message: 'your participation has already been approved' });
      }
      // Je vérifie si l'utilisateur a déjà soumis une demande de participation non approuvée
    const pendingParticipation = await Participation.findOne({
      where: { user_id: userId, event_id: id, approval: false }
    });

    if (pendingParticipation) {
      return res.status(400).json({ message: 'you\'ve already submitted a participation request' });
    }
      // On créé la demande de participation
      const participationRequest = await Participation.create({
        user_id: userId,
        event_id: id,
        approval: false // par défaut, la demande n'est pas encore approuvée
      });
  
      return res.status(201).json({ message: 'participation request sent', participationRequest });
    } catch (error) {
      res.status(400).json({ error: 'Invalid input' });
    }
  },
  
  
  //--------------L'HOTE CONFIRME LA DEMANDE DE PARTICIPATION------------

// accéder aux demandes de participations non approuvées pour un évènement
async listPendingParticipations(req, res) {
  try {
    const { id } = req.params; 
    const userId = req.user.id; 

    // On vérifie si l'évènement existe
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'event not found' });
    }

    // On vérifie si l'utilisateur est l'hôte de l'évènement
    if (event.user_id !== userId) {
      return res.status(403).json({ message: 'Access denied, this his not your event' });
    }

    // On récupère les demandes de participation non approuvées
    const pendingParticipations = await Participation.findAll({
      where: { event_id: id, approval: false },
      include: [{ model: User, as: 'user' }] // on inclue les informations de l'utilisateur
    });

    return res.status(200).json(pendingParticipations);
  } catch (error) {
    res.status(400).json({ error });
  }
},

// L'hôte de l'évènement confirme la demande de participation 
async  hostApproval(req, res) {
  try {
    const { id } = req.params; // ID de l'évènement 
    const event_participationId = req.body.id; // ID de la participation de l'event à partir des paramètres de la route
    const userId = req.user.id; // ID de l'utilisateur à partir du token JWT

    // On vérifie si l'évènement existe
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'event not found' });
    }

    // Vérifier si l'utilisateur est bien l'hôte de l'évènement
    if (event.user_id !== userId) {
      return res.status(403).json({ message: 'Access denied, this his not your event' });
    }

    // On vérifie si la participation existe
    const participation = await Participation.findByPk(event_participationId);
    if (!event_participationId) {
      return res.status(404).json({ message: 'Participation not found' });
    }

    // Mise à jour de la participation pour la confirmer
    participation.approval = true;
    await participation.save();

    return res.status(200).json({ message: 'Participation approved' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  
  }
},

//--------------L'HOTE ANNULE LA PARTICIPATION D'UN UTILISATEUR------------

async hostCancelParticipation(req, res) {
  try {
    const { id } = req.params; // ID de l'évènement à partir des paramètres de la route
    const event_participationId = req.body.id; // ID de la participation de l'event à partir du corps de la requête
    const userId = req.user.id; // ID de l'utilisateur à partir du token JWT

    // On vérifie si l'évènement existe
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Vérifier si l'utilisateur est bien l'hôte de l'évènement
    if (event.user_id !== userId) {
      return res.status(403).json({ message: 'Access denied, this is not your event' });
    }

    // On vérifie si la participation existe
    const participation = await Participation.findByPk(event_participationId);
    if (!participation) {
      return res.status(404).json({ message: 'Participation not found' });
    }

    // Supprimer la participation
    await participation.destroy();

    return res.status(204).json({ message: 'Participation canceled' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
},

  //--------------ANNULER SA PARTICIPATION A UN EVENT------------

  async cancelParticipation(req, res) {
    try {
      const participation = await Participation.findOne({
        where: {
          user_id: req.user.id,
          event_id: req.params.id,
          
        },
      });

      if (!participation) {
        return res.status(404).json({ error: 'Participation not found' });
      }

      await participation.destroy();

      res.status(204).json({message: 'Participation canceled'});

    } catch (error) {
      res.status(400).json({ error: 'Invalid request' });
    }
  },

  //--------------LISTE DES PARTICIPANTS------------

  async listAllParticipation(req, res) {
    try {

      const { id } = req.params; 
      //const userId = req.user.id; 

      // On vérifie si l'évènement existe
      const event = await Event.findByPk(id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

     //pour n'autoriser que l'hôte de l'évènement à voir la liste des participants
      // if (event.user_id !== userId) {
      //   return res.status(403).json({ message: 'Access denied, this his not your event' });
      // } 
      const participations = await Participation.findAll({
        where: {
          event_id: req.params.id,
        },
        include: [
          {
            association: 'user',
            attributes: { exclude: [ 'password', 'password_confirmation' ] }
          }
        ],
        });

      res.status(200).json(participations);

    } catch (error) {
      res.status(400).json({ error : 'request error' });
    }
  },
}
