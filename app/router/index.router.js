import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import eventController from '../controllers/event.controller.js';
import participationController from '../controllers/participation.controller.js';
import userController from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewears/jwt.middlewear.js';

const router = Router();

// Auth----------------------------------
/**
 * post /register
 * @summary create a new user
 * @tags Auth
 * @param {string} first_name.query - user first name
 * @param {string} last_name - user last name
 * @param {string} birth_date - user birth date 
 * @param {string} email - user email
 * @param {string} password - user password
 * @param {string} password_confirmation - user password confirmation 
 * @param {string} about - user complementary infos
 * @param {string} profil_picture - user picture for his profil 
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response
 * {
 * "first_name": "John",
 * "last_name": "Doe",
 * "birth_date": "1990-01-01",
 * "address": "123 Main St 34500 Maville",
 * "email": "john.doe@example.com",
 * "password": "monmdpHashé",
 * "password_confirmation": "monmdpHashé",
 * "about": "Hello, I'm John Doe",
 * "profil_picture": "https://example.com/profile.jpg"
 * }
 * @return {ErrorResponseJson} 400 - error response - /jsonapplication/json
 */

router.post('/register', authController.registerUser); //s'inscrire

/**
 * post /login
 * @summary log in
 * @tags Auth
 * @param {string} email - user email
 * @param {string} password - user password
 * @param {string} password - user password
 * @return {object} 200 - success response - application/json 
 * @example response - 200 - success response
 * {
 *   "id": 1,
 *   "email": "user@example.com",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 * @return {ErrorResponseJson} 400 - error response - /jsonapplication/json
 */

router.post('/login', authController.loginUser); //s'identifier

//Utilisateur------------------------------------

/**
 * GET /user/me
 * @summary Get my user profile
 * @tags User
 * @return {object} 200 - An object containing the user's profile - application/json
 * @example response - 200 - success response example
 * {
 *   "id": "string",
 *   "name": "string",
 *   "email": "user@example.com"
 * }
 * @returns {Error} 401 - Unauthorized, invalid or missing token
 * @returns {Error} 500 - Internal server error
 * @security Bearer
 */
router.get('/user/me', authenticateToken, userController.getMyUser); //accéder à son profil

/**
 * GET /user/:id
 * @summary Access a user profile
 * @tags User
 * @param {string} id.path.required - the user ID
 * @return {object} 200 - An object containing the requested user's profile - application/json
 * @example response - 200 - success response example
 * {
  "id": 1,
  "first_name": "Noé",
  "last_name": "Plantier",
  "birth_date": "1998-03-23",
  "address": "Pl Général de Gaulle 50000 Saint-Lô",
  "email": "plantiernoe50@gmail.com",
  "password": "$2b$10$MsPn54lAwKb6eliuhY5.Oe6LwcMKsia4sIO50/41D2ysO9SRXK3de",
  "password_confirmation": "$2b$10$gV8D9RnGjpdVuSqV640SpupOMG0KujQCs/4Grzq0ZUF57t/1vSFyi",
  "about": "Je suis un passionné de jardinage",
  "profil_picture": "https://avatars.githubusercontent.com/u/157673098?v=4",
  "createdAt": "2024-07-11T17:03:47.523Z",
  "updatedAt": null,
  "events": [
    {
      "id": 2,
      "title": "Soirée électro ",
      "description": "découvrez le meilleur DJ de Lyon.",
      "start_date": "2024-08-01",
      "finish_date": "2024-08-01",
      "start_hour": "22:00:00",
      "address": "7, rue des Lilas",
      "location": {
        "crs": {
          "type": "name",
          "properties": {
            "name": "EPSG:4326"
          }
        },
        "type": "Point",
        "coordinates": [45.5603292, 4.8064673]
      },
      "privacy_type": false,
      "picture": "https://avatars.githubusercontent.com/u/157673098?v=4",
      "max_attendee": 120,
      "status": true,
      "pmr_access": true,
      "zip_code_city": "69000 Lyon",
      "createdAt": "2024-07-11T17:03:47.523Z",
      "updatedAt": null,
      "user_id": 1,
      "host": {
        "id": 1,
        "first_name": "Noé",
        "last_name": "Plantier",
        "birth_date": "1998-03-23",
        "address": "Pl Général de Gaulle 50000 Saint-Lô",
        "email": "plantiernoe50@gmail.com",
        "password": "$2b$10$MsPn54lAwKb6eliuhY5.Oe6LwcMKsia4sIO50/41D2ysO9SRXK3de",
        "password_confirmation": "$2b$10$gV8D9RnGjpdVuSqV640SpupOMG0KujQCs/4Grzq0ZUF57t/1vSFyi",
        "about": "Je suis un passionné de jardinage",
        "profil_picture": "https://avatars.githubusercontent.com/u/157673098?v=4",
        "createdAt": "2024-07-11T17:03:47.523Z",
        "updatedAt": null
      }
    }
  ]
}
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Internal server error
 */
router.get('/user/:id', userController.getUser); //accéder à un profil

/**
 * PATCH /user/me
 * @summary Update user profile
 * @tags User
 * @security Bearer
 * @param {object} request.body.required - User update information - application/json
 * @example request - example update
 * {
 *   "name": "Updated Name",
 *   "email": "updatedemail@example.com"
 * }
 * @return {object} 200 - An object containing the updated user's profile - application/json
 * @example response - 200 - success response example
 * {
 *   "id": "string",
 *   "name": "Updated Name",
 *   "email": "updatedemail@example.com"
 * }
 * @returns {Error} 400 - Bad Request, invalid update information
 * @returns {Error} 401 - Unauthorized, invalid or missing token
 * @returns {Error} 500 - Internal server error
 */
router.patch('/user/me', authenticateToken, userController.updateUser); //modifier son profil

/**
 * DELETE /user/me
 * @summary Delete user profile
 * @tags User
 * @security Bearer
 * @return {object} 200 - Success message - application/json
 * @example response - 200 - success response example
 * {
 * }
 * @returns {Error} 401 - Unauthorized, invalid or missing token
 * @returns {Error} 500 - Internal server error
 */
router.delete('/user/me', authenticateToken, userController.deleteMyUser); //supprimer son profil


// Évènements-----------------------------------

/**
 * post /event
 * @summary create a new event
 * @tags event
 * @param {string} title - event title
 * @param {date} start_date - event starting date
 * @param {time} start_hour - event starting hour
 * @param {date} finish_date - event finishing date
 * @param {string} address - event city
 * @param {string} location - event lattitude and longitude
 * @param {boolean} privacy_type- event privacy 
 * @param {int} max_attendee - maximum authorised participants
 * @param {boolean} status - before or after an event is over 
 * @param {boolean} pmr_access - PMR adapted 
 * @param {string} zip_code_city - envent zip-code and city
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response
 * {
 * "title": "Soirée pyjama",
 * "description": "films et popocorns à volonté.",
 * "start_date": "2024-07-17",
 * "start_hour": "21:00:00",
 * "finish_date": "2024-07-17",
 * "address": "9, place des Faubourgs",
 * "location": [45.5603292, 4.8064673],
 * "privacy_type": false,
 * "picture": "https://avatars.githubusercontent.com/u/157673098?v=4",
 * "max_attendee": 20,
 * "status": false,
 * "pmr_access": true,
 * "zip_code_city": "69000 Lyon",
 * "user_id": 1,
 * "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 * @return {ErrorResponseJson} 400 - error response - /jsonapplication/json
 */
router.post('/event', authenticateToken, eventController.createEvent); //créer un évènement

 /**
 * get /event
 * @summary find events based on their distances within a localisation or by a text research
 * @tags event
 * @param {string} request.body - zip-code and city send a request for all the referenced events 
 * @param {string} request.body - all the events filtered within a defined distance by the user
 * @param {string} request.body- all the events that suit key words research for an event 
 * @return {object} 200 - success response - application/json
 @example response - 200 - success response
 * {
 * "title": "Soirée pyjama",
 * "description": "films et popocorns à volonté.",
 * "start_date": "2024-07-17",
 * "start_hour": "21:00:00",
 * "finish_date": "2024-07-17",
 * "address": "9, place des Faubourgs",
 * "location": [45.5603292, 4.8064673],
 * "privacy_type": false,
 * "picture": "https://avatars.githubusercontent.com/u/157673098?v=4",
 * "max_attendee": 20,
 * "status": false,
 * "pmr_access": true,
 * "zip_code_city": "69000 Lyon",
 * "user_id": 1
 * }
 * @return {ErrorResponseJson} 400 - error response - /jsonapplication/json
 */

router.get('/events', eventController.getEvent); //accéder aux évènements selon sa recherche

 /**
 * get /event/id
 * @summary find an event details with his id
 * @tags event
 * @param {string} id.path.required - event id path
 * @return {object} 200 - success response - application/json
 @example response - 200 - success response
 * {
 * "title": "Soirée pyjama",
 * "description": "films et popocorns à volonté.",
 * "start_date": "2024-07-17",
 * "start_hour": "21:00:00",
 * "finish_date": "2024-07-17",
 * "address": "9, place des Faubourgs",
 * "location": [45.5603292, 4.8064673],
 * "privacy_type": false,
 * "picture": "https://avatars.githubusercontent.com/u/157673098?v=4",
 * "max_attendee": 20,
 * "status": false,
 * "pmr_access": true,
 * "zip_code_city": "69000 Lyon",
 * "user_id": 1
 * }
 * @return {ErrorResponseJson} 400 - error response - /jsonapplication/json
 */

router.get('/event/:id', eventController.getOneEvent); //accéder aux détails d'un évènement

/**
 * PATCH /event/:id
 * @summary Update an event
 * @tags event
 * @security JWT
 * @param {string} id.path.required - The event ID
 * @param {object} request.body.required - Event update information - application/json
 * @example request - example update
 * {
 *  "title": "Updated Title",
 * "description": "Updated Description",
 * "start_date": "2024-07-17",
 * "finish_date": "2024-07-17",
 * "start_hour": "21:00:00",
 * "address": "9, place des Faubourgs",
 * "location": [45.5603292, 4.8064673],
 * "privacy_type": false,
 * "picture": "https://avatars.githubusercontent.com/u/157673098?v=4",
 * "max_attendee": 20,
 * "status": false,
 * "pmr_access": true,
 * "zip_code_city": "69000 Lyon",
 * "user_id": 1
 * }
 * @return {object} 200 - An object containing the updated event - application/json
  * @example response - 200 - success response example
  * {
  * "title": "Updated Title",
  * "description": "Updated Description",
  * "start_date": "2024-07-17",
  * "finish_date": "2024-07-17",
  * "start_hour": "21:00:00",
  * "address": "9, place des Faubourgs",
  * "location": [45.5603292, 4.8064673],
  * "privacy_type": false,
  * "picture": "https://avatars.githubusercontent.com/u/157673098?v=4",
  * "max_attendee": 20,
  * "status": false,
  * "pmr_access": true,
  * "zip_code_city": "69000 Lyon",
  * "user_id": 1
  * }
  * @return {ErrorResponseJson} 400 - error response - /jsonapplication/json
  * @return {ErrorResponseJson} 401 - Unauthorized, invalid or missing token
  * @return {ErrorResponseJson} 404 - Event not found
  * @return {ErrorResponseJson} 500 - Internal server error
  * @security Bearer
*/
router.patch('/event/:id', authenticateToken, eventController.updateEvent); //modifier son évènement

/**
 * DELETE /event/:id
 * @summary Delete an event
 * @tags event
 * @security JWT
 * @param {string} id.path.required - The event ID
 * @return {object} 200 - Success message - application/json
 * @example response - 200 - success response example
 * {
 * }
 * @return {ErrorResponseJson} 401 - Unauthorized, invalid or missing token
 * @return {ErrorResponseJson} 404 - Event not found
 * @return {ErrorResponseJson} 500 - Internal server error
 */
router.delete('/event/:id', authenticateToken, eventController.deleteEvent); //supprimer son évènement

// Participation----------------------------------

/**
 * POST /event/:id/participate
 * @summary Demande de participation à un événement
 * @tags participation
 * @param {string} id.path.required - L'identifiant de l'événement
 * @security JWT
 * @return {object} 201 - Réponse de succès - application/json
 * @example response - 201 - Exemple de réponse de succès
 * {
 *   "message": "Demande de participation envoyée avec succès."
 * }
 * @return {object} 400 - Réponse d'erreur - application/json
 * @example response - 400 - Exemple de réponse d'erreur
 * {
 *   "error": "Erreur lors de l'envoi de la demande de participation."
 * }
 */
router.post('/event/:id/participate', authenticateToken, participationController.approvalRequest); //l'utilisateur demande à participer à un évènement

/**
 * PATCH /event/:id/participate/accept
 * @summary L'hôte confirme une participation à un évènement
 * @tags participation
 * @param {string} id.path.required - ID de l'événement
 * @param {object} request.body.required - Corps de la demande contenant l'ID de la participation
 * @returns {object} 200 - Participation approuvée
 * @returns {object} 403 - Accès refusé, ce n'est pas votre événement
 * @returns {object} 404 - Événement ou participation non trouvée
 * @returns {object} 400 - Erreur de requête
 * @security JWT
 * @description Permet à l'hôte de l'événement d'approuver une demande de participation
 * */
router.patch('/event/:id/participate/accept', authenticateToken, participationController.hostApproval); //l'hôte confirme une participation à un évènement

/**
 * delete /event/:id/participate/refuse
 * @summary L'hôte refuse une participation à un événement
 * @tags participation
 * @param {string} id.path.required - ID de l'événement
 * @param {object} request.body.required - Corps de la demande contenant l'ID de la participation
 * @returns {object} 200 - Participation refusée
 * @returns {object} 403 - Accès refusé, ce n'est pas votre événement
 * @returns {object} 404 - Événement ou participation non trouvée
 * @returns {object} 400 - Erreur de requête
 * @security JWT
 * @description Permet à l'hôte de l'événement de refuser une demande de participation
 * 
 */
router.delete('/event/:id/participate/cancel', authenticateToken, participationController.cancelParticipation); //annuler sa participation à un évènement

/**
 * GET /event/:id/participate/all
 * @summary Liste des participants
 * @tags participation
 * @param {string} id.path.required - ID de l'événement
 * @returns {object} 200 - Liste des participants
 * @returns {object} 404 - Événement non trouvé
 * @returns {object} 500 - Erreur serveur
 * @security JWT
 * @description Permet de récupérer la liste des participants à un événement
 * */
router.get('/event/:id/participate/all', authenticateToken, participationController.listAllParticipation); //liste des participants



export default router;
