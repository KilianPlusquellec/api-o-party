import { z } from 'zod';
import { Participation } from '../models/index.model.js';

//--------------DEMANDE DE PARTICIPATION A UN EVENT------------
  
const participationSchema = z.object({
  approval: z.boolean().default(false),
  user_id: z.number().int(),
  event_id: z.number().int(),
});

export default {
  async approvalRequest(req, res) {
    try {
      const participationRequest = participationSchema.parse({
        ...req.body,
        eventId: parseInt(req.params.id, 10),
      });

      const participation = await Participation.create(participationRequest, {
        include: [{
          association: 'user',
        }, {
          association: 'event',
        }]
      });

      res.status(200).json(participation);

    } catch (error) {
      res.status(400).json({ error });
    }
  },

  //--------------L'HOTE CONFIRME LA DEMANDE DE PARTICIPATION------------

  async hostApproval(req, res) {
    try {
      const { user_id } = req.body;
      const { id: event_id } = req.params;
  
      // Vérifier si user_id et event_id sont fournis
      if (!user_id || !event_id) {
        return res.status(400).json({ error: 'User ID and Event ID are required' });
      }
  
      // Rechercher la participation en fonction de user_id et event_id
      const participation = await Participation.findOne({
        where: {
          user_id,
          event_id,
        },
      });
  
      // Si la participation n'est pas trouvée, renvoyer une erreur 404
      if (!participation) {
        return res.status(404).json({ error: 'Participation not found' });
      }
  
      // Vérifier si la participation est déjà approuvée
      if (participation.approval) {
        return res.status(400).json({ error: 'Participation already approved' });
      }
  
      // Mettre à jour l'approbation de la participation
      await participation.update({ approval: true });
  
      // Renvoyer la participation mise à jour
      res.status(200).json(participation);
  
    } catch (error) {
      console.error('Error approving participation:', error);
      res.status(500).json({ error: 'An error occurred while approving participation' });
    }
  },

  //--------------ANNULER SA PARTICIPATION A UN EVENT------------

  async cancelParticipation(req, res) {
    try {
      const participation = await Participation.findOne({
        where: {
          user_id: req.body.user_id,
          event_id: req.params.id,
        },
      });

      if (!participation) {
        return res.status(404).json({ error: 'Participation not found' });
      }

      await participation.destroy();

      res.status(204).json();

    } catch (error) {
      res.status(400).json({ error });
    }
  },

  //--------------LISTE DES PARTICIPANTS------------

  async listParticipation(req, res) {
    try {
      const participations = await Participation.findAll({
        where: {
          event_id: req.params.id,
        },
        include: ['user'],
      });

      res.status(200).json(participations);

    } catch (error) {
      res.status(400).json({ error });
    }
  },
}
