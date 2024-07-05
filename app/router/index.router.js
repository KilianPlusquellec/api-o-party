import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import eventController from '../controllers/event.controller.js';
import participationController from '../controllers/participation.controller.js'


const router = Router();

// Auth

router.post('/register', userController.registerUser); //s'inscrire
router.post('/login', userController.loginUser); //s'identifier

//Utilisateur

router.get('/user/me', userController.getMyUser); //accéder à son profil
router.get('/user/:id', userController.getUser); //accéder à un profil
router.patch('/user/me', userController.updateUser); //modifier son profil
router.delete('/user/me', userController.deleteMyUser); //supprimer son profil

// Événements

router.post('/events', eventController.createEvent); //créer un évènement
router.get('/events', eventController.getEvent); //accéder aux évènements
router.get('/events/:id', eventController.getOneEvent); //accéder aux détails d'un évènement
router.patch('/events/:id', eventController.updateEvent); //modifier son évènement
router.delete('/events/:id', eventController.deleteEvent); //supprimer son évènement

// Participation

router.post('/events/:id/participate', participationController.approvalRequest); //l'hôte demande à participer à un évènement
router.post('/events/:id/participate', participationController.userApproval); //l'hôte confirme une participation à un évènement
router.get('/events/:id/participate', participationController.cancelParticipation); //annuler sa participation à un évènement
router.get('/events/:id/participate', participationController.listParticipation); //liste des participants



export default router;
