import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import eventController from '../controllers/event.controller.js';
import participationController from '../controllers/participation.controller.js';
import userController from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewears/jwt.middlewear.js';

const router = Router();

// Auth

router.post('/register', authController.registerUser); //s'inscrire
router.post('/login', authController.loginUser); //s'identifier

//Utilisateur

router.get('/user/me', authenticateToken, userController.getMyUser); //accéder à son profil
router.get('/user/:id', userController.getUser); //accéder à un profil
router.patch('/user/me', authenticateToken, userController.updateUser); //modifier son profil
router.delete('/user/me', authenticateToken, userController.deleteMyUser); //supprimer son profil

// Événements

router.post('/events', eventController.createEvent); //créer un évènement
router.get('/events', eventController.getEvent); //accéder aux évènements
router.get('/event/:id', eventController.getOneEvent); //accéder aux détails d'un évènement
router.patch('/event/:id', authenticateToken, eventController.updateEvent); //modifier son évènement
router.delete('/event/me', authenticateToken, eventController.deleteEvent); //supprimer son évènement

// Participation

router.post('/event/:id/participate', participationController.approvalRequest); //l'utilisateur demande à participer à un évènement
router.post('/event/:id/participate', participationController.hostApproval); //l'hôte confirme une participation à un évènement
router.delete('/event/:id/participate', participationController.cancelParticipation); //annuler sa participation à un évènement
router.get('/event/:id/participate', participationController.listParticipation); //liste des participants



export default router;
