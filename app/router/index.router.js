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
 * @description create an user account
 * @tags Auth
 * @param {string} first_name.query.required - user first name
 * @param {string} last_name.query.required - user last name
 * @param {string} birth_date.query - user birth date 
 * @param {string} email.query.required - user email
 * @param {string} password.query.required - user password
 * @param {string} password_confirmation.query.required - user password confirmation 
 * @param {string} about.query - user complementary infos
 * @param {string} profil_picture.query - user picture for his profil 
 * @return {string} 201 - success response - application/json
 * @example response - 201 - success response
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
 * @return {string} 401 - error response - application/json
 * @example response - 401 - error response
 * {
 * "error": "Invalid email or password"
 * }
 * @return {string} 400 - error response - application/json
 * @example response - 400 - error response
 * {
 * "error": "Invalid input"
 * }
 */

router.post('/register', authController.registerUser); //s'inscrire

/**
 * post /login
 * @summary log in
 * @description user's connexion to his account
 * @tags Auth
 * @param {string} email.query.required - user email
 * @param {string} password.query.required - user password
 * @return {string} 200 - success response - application/json 
 * @example response - 200 - success response (token bearer in header)
 * {
  "id": 1,
  "first_name": "Noé",
  "last_name": "Plantier",
  "birth_date": "1998-03-23",
  "address": "Pl Général de Gaulle 50000 Saint-Lô",
  "email": "template@gmail.com",
  "password": "$2b$10$MsPn54lAwKb6eliuhY5.Oe6LwcMKsia4sIO50/41D2ysO9SRXK3de",
  "password_confirmation": "$2b$10$gV8D9RnGjpdVuSqV640SpupOMG0KujQCs/4Grzq0ZUF57t/1vSFyi",
  "about": "Je suis un passionné de jardinage",
  "profil_picture": "https://avatars.githubusercontent.com/u/157673098?v=4",
  "createdAt": "2024-07-11T17:03:47.523Z",
  "updatedAt": null
}
 * @return {string} 401 - error response - application/json
  * @example response - 401 - error response
  * {
  * "error": "Invalid email or password"
  * }
  * @return {string} 400 - error response - application/json
  * @example response - 400 - error response
  * {
  * "error": "Invalid input"
  * }
 */

router.post('/login', authController.loginUser); //s'identifier

//Utilisateur------------------------------------

/**
 * GET /user/me
 * @summary Get my user profile
 * @description user's access to his profil
 * @tags User
 * @security Bearer
 * @return {string} 200 - An object containing the user's profile - application/json 
 * @example response - 200 - success response example
 * {
  "id": 1,
  "first_name": "Noé",
  "last_name": "Plantier",
  "birth_date": "1998-03-23",
  "address": "Pl Général de Gaulle 50000 Saint-Lô",
  "email": "template@gmail.com",
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
        "coordinates": [
          45.5603292,
          4.8064673
        ]
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
 * @returns {string} 401 - Unauthorized, invalid or missing token - application/json
 * @example response - 401 - Unauthorized, invalid or missing token
 * {
 *  "error": "Unauthorized"
 * }
 * 
 */
router.get('/user/me', authenticateToken, userController.getMyUser); //accéder à son profil

/**
 * GET /user/:id
 * @summary Access a user profile
 * @description Access to an other user profil as a "visitor" : can't create, update or delete an event nor see personnal infos 
 * @tags User
 * @security Bearer
 * @param {string} id.path.required - the user ID
 * @return {string} 200 - An object containing the requested user's profile - application/json
 * @example response - 200 - success response example
 * {
  "id": 1,
  "first_name": "Noé",
  "last_name": "Plantier",
  "birth_date": "1998-03-23",
  "address": "Pl Général de Gaulle 50000 Saint-Lô",
  "email": "template@gmail.com",
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
 * @returns {string} 404 - User not found - application/json
  * @example response - 404 - User not found
  * {
  * "error": "User not found"
  * }
 */
router.get('/user/:id', userController.getUser); //accéder à un profil

/**
 * PATCH /user/me
 * @summary Update user profile
 * @description update your user profil
 * @tags User
 * @security Bearer
 *  * @param {string} first_name.query - user first name
 * @param {string} last_name.query - user last name
 * @param {string} birth_date.query - user birth date 
 * @param {string} email.query - user email
 * @param {string} password.query - user password
 * @param {string} password_confirmation.query - user password confirmation 
 * @param {string} about.query - user complementary infos
 * @param {string} profil_picture.query - user picture for his profil 
 * @param {object} request.body.required - User update information - application/json
 * @example request - example update
 *{
  "first_name": "John",
  "last_name": "Doe",
  "birth_date": "1990-01-01",
  "address": "123 Main St",
  "email": "john.doe@example.com",
  "password": "password321",
  "password_confirmation": "password321", 
  "about": "Hello, I'm John Doe and I'm a developer",
  "profil_picture": "https://example.com/profile.jpg"
}
 * @return {string} 200 - An object containing the updated user's profile - application/json
 * @example response - 200 - success response example ( new hashed password) - application/json
 * {
  "first_name": "John",
  "last_name": "Doe",
  "birth_date": "1990-01-01",
  "address": "123 Main St",
  "email": "john.doe@example.com",
  "password": "$2b$10$MsPn54lAwKb6eliuhY5.Oe6LwcMKsia4sIO50/41D2ysO9SRXK3de",
  "password_confirmation": "$2b$10$MsPn54lAwKb6eliuhY5.Oe6LwcMKsia4sIO50/41D2ysO9SRXK3de", 
  "about": "Hello, I'm John Doe and I'm a developer",
  "profil_picture": "https://example.com/profile.jpg"
}
 * @returns {string} 401 - Unauthorized, invalid or missing token - application/json
 * @example response - 401 - Unauthorized, invalid or missing token
 * {
 *   "error": "Unauthorized"
 * }
 * @returns {string} 400 - Bad Request, invalid update information - application/json
 * @example response - 400 - Bad Request, invalid update information - application/json
 * {
 *  "error": "Invalid input"
 * }
 */
router.patch('/user/me', authenticateToken, userController.updateUser); //modifier son profil

/**
 * DELETE /user/me
 * @summary Delete user profile
 * @tags User
 * @security Bearer
 * @return {string} 204 - Success message - application/json
 * @example response - 204 - success response example
 * {
 * }
 * @returns {string} 400 - Unauthorized, invalid or missing token - application/json
 * @example response - 400 - Unauthorized, invalid or missing token
 * {
 * "error": "Unauthorized"
 * }
 */
router.delete('/user/me', authenticateToken, userController.deleteMyUser); //supprimer son profil


// Évènements-----------------------------------

/**
 * post /event
 * @summary create a new event
 * @description the user can host an event
 * @tags event
 * @security Bearer
 * @param {string} title.query.required - event title
 * @param {date} start_date.query.required - event starting date
 * @param {time} start_hour.query.required - event starting hour
 * @param {date} finish_date.query.required - event finishing date
 * @param {string} address.query.required - event address
 * @param {string} location.query.required - event lattitude and longitude
 * @param {boolean} privacy_type.query.required - event privacy 
 * @param {int} max_attendee.query.required - maximum authorised participants
 * @param {boolean} status.query.required - before or after an event is over 
 * @param {boolean} pmr_access.query.required - PMR adapted 
 * @param {string} zip_code_city.query.required - envent zip-code and city
 * @param {string} picture.query - event picture
 * @return {string} 201 - success response - application/json
 * @example response - 201 - success response (token bearer in header)
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
 * @return {string} 400 - Bad Request, invalid update information - application/json
 * @example response - 400 - Bad Request, invalid update information
 * {
 *  "error": "Invalid input"
 * }
 */
router.post('/event', authenticateToken, eventController.createEvent); //créer un évènement

 /**
 * get /events
 * @summary find events near you
 * @description find events based on their distances within a localisation or by a text research
 * @tags event
 * @param {string} request.body - all the events filtered within a defined distance by the user
 * @return {string} 200 - success response - application/json
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
 * "user_id": 1
 * }
 * @return {string} 401 - error response Invalid location - application/json
 * @example response - 401 - Invalid location
 * {
 *  "error": "Invalid latitude or longitude"
 * }
 * @param {string} request.body- all the events that suit key words research for an event 
 * @return {string} 402 - error response  Invalid input - application/json
 * @example response - 402 - Invalid input
 * {
 *  "error": "Invalid text research"
 * }
 * @return {string} 404 - Bad Request, invalid search or text information - application/json
 * @example response - 404 - Bad Request, invalid search or text information 
 * {
 *  "error": "Invalid input"
 * }
 */

router.get('/events', eventController.getEvent); //accéder aux évènements selon sa recherche

 /**
 * get /event/id
 * @summary find an event
 * @description find an event details with his id
 * @tags event
 * @param {string} id.path.required - event id path
 * @return {string} 200 - success response - application/json
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
 * "user_id": 1
 * }
 * @return {string} 401 - error response Invalid event ID - application/json 
 * @example response - 401 - Invalid event ID
 * {
 *  "error": "Invalid event ID"
 * }
 * @return {string} 402 - error response event !== host ID  - application/json 
 * @example response - 402 - event !== host ID 
 * {
 *  "error": "Event not found"
 * }
 * @return {string} 400 - Bad Request, invalid input information - application/json
 * @example response - 400 - Bad Request, invalid input information
 * {
 *  "error": "Invalid input"
 * }
 */
 router.get('/event/:id', eventController.getOneEvent); //accéder aux détails d'un évènement


 /**
 * PATCH /event/:id
 * @summary Update an event
 * @description Update an event I host
 * @tags event
 * @security Bearer
 * @param {string} title.query - event title
 * @param {date} start_date.query - event starting date
 * @param {time} start_hour.query - event starting hour
 * @param {date} finish_date.query - event finishing date
 * @param {string} address.query - event address
 * @param {string} location.query - event lattitude and longitude
 * @param {boolean} privacy_type.query - event privacy 
 * @param {int} max_attendee.query - maximum authorised participants
 * @param {boolean} status.query - before or after an event is over 
 * @param {boolean} pmr_access.query - PMR adapted 
 * @param {string} zip_code_city.query - envent zip-code and city
 * @param {string} picture.query - event picture
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
 * @return {string} 200 - An object containing the updated event - application/json
 * @example response - 200 - success response example
 * {
 * "title": "Updated Title",
 * "description": "Updated Description",
 * "start_date": "2024-07-17",
 *  "finish_date": "2024-07-17",
 * "start_hour": "21:00:00",
 * "address": "9, place des Faubourgs",
 * "location": [45.5603292, 4.8064673],
 * "privacy_type": false,
 * "picture": "https://avatars.githubusercontent.com/u/157673098?v=4",
 * "max_attendee": 30,
 * "status": false,
 * "pmr_access": true,
 * "zip_code_city": "69000 Lyon",
 * "user_id": 1
 * }
 * @return {string} 404 - Bad Request, invalid information - application/json
 * @example response - 404 - Bad Request, invalid information
 * {
 *  "error": "Event not found"
 * }
 * @return {string} 403 - Bad Request, host !== event ID - application/json
 * @example response - 403 - Bad Request, host !== event ID
 * {
 *  "error": "User has no permission to edit this event"
 * }
 * @return {string} 400 - Bad Request, invalid input information - application/json
 * @example response - 400 - Bad Request, invalid input information
 * {
 *  "error": "Invalid input"
 * }
*/
router.patch('/event/:id', authenticateToken, eventController.updateEvent); //modifier son évènement

/**
 * DELETE /event/:id
 * @summary Delete an event
 * @description the user delete an event he created
 * @tags event
 * @security Bearer
 * @param {string} id.path.required - The event ID
 * @return {string} 400 - error response - application/json
 * @example response - 400 - Invalid event ID
 * {
 *  "message": "Event not found"
 * }
 * @return {string} 204 - Success message - application/json
 * @example response - 204 - success response example
 * {
 *  "message": "deleted event."
 * }
 * @return {string} 400 - error response - application/json
 * @example response - 400 - error response example
 * {
 *  "error": "Invalid request"
 * }
 */
router.delete('/event/:id', authenticateToken, eventController.deleteEvent); //supprimer son évènement

// Participation----------------------------------

/**
 * POST /event/:id/participate
 * @summary User participation request
 * @description the user can submit a request for an event 
 * @tags participation
 * @security Bearer
 * @param {string} id.path.required - event id
 * @return {string} 201 - success response - application/json
 * @example response - 201 - success response example
 * {
  "message": "participation request sent",
  "participationRequest": {
    "id": 10,
    "user_id": 3,
    "event_id": 1,
    "approval": false,
    "updatedAt": "2024-07-15T14:42:25.726Z",
    "createdAt": "2024-07-15T14:42:25.726Z"
  }
}
 * @return {string} 400 - error response - application/json
 * @example response - 400 - error response example
 * {
 *   "message": "your participation has already been approved."
 * }
 * @return {string} 401 - error response - application/json
 * @example response - 401 - error response example
 * {
 *   "message": "you've already submitted a participation request."
 * }
 * @return {string} 404 - Bad Request, invalid information - application/json
 * @example response - 404 - Bad Request, invalid information
 * {
 *  "message": "Event not found"
 * }
 */
router.post('/event/:id/participate', authenticateToken, participationController.approvalRequest); //l'utilisateur demande à participer à un évènement

/**
 * PATCH /event/:id/participate/accept
 * @summary participation request confirmed
 * @description participation request can be confirmed by the host
 * @tags participation
 * @security Bearer
 * @param {string} id.path.required - event id
 * @param {string} id.required - participation id
 * @param {object} request.body.required - participation request
 * @example request - participation table id
 * {
 * "id": 1
 * }
 * @returns {string} 200 - Participation found - application/json
 * @example response - 200 - Participation approuvée
 * {
 * "message": "Participation approved."
 * }
 * @returns {string} 403 - Access denied, this his not your event - application/json
 * @example response - 403 - Access denied, this his not your event
 * {
 * "message": "Access denied, this is not your event"
 * }
 * @returns {string} 404 - event not found - application/json
 * @example response - 404 - event not found
 * {
 * "message": "event not found"
 * }
 * @returns {string} 400 - Invalid request - application/json
 * @example response - 400 - Invalid request
 * {
 * "error": "Invalid request"
 * }
 */
router.patch('/event/:id/participate/accept', authenticateToken, participationController.hostApproval); //l'hôte confirme une participation à un évènement

/**
 * DELETE /event/:id/participate/cancel
 * @summary the user cancel his event participation
 * @description the user can cancel his participation request before or after the request beeing approuved by the host
 * @tags participation
 * @security Bearer
 * @param {string} id.path.required - event id
 * @returns {string} 204 - Participation canceled - application/json
 * @example response - 204 - Participation canceled
 * {
 *  "message": "Participation canceled."
 * }
 * @returns {string} 404 - Participation not found - application/json
 * @example response - 404 - Participation not found
 * {
 * "error": "Participation not found"
 * }
 * @returns {string} 400 - Invalid request - application/json
 * @example response - 400 - Invalid request
 * {
 * "error": "Invalid request"
 * }
 */
router.delete('/event/:id/participate/cancel', authenticateToken, participationController.cancelParticipation); //annuler sa participation à un évènement

/**
 * GET /event/:id/participate/all
 * @summary participants list
 * @description the host can access to the participants list (approuved or not)
 * @tags participation
 * @security Bearer
 * @param {string} id.path.required - event id
 * @return {object} 200 - participant list - application/json
 * @example response - 200 - participant list
 * [
  {
    "id": 1,
    "approval": false,
    "createdAt": "2024-07-11T17:03:47.523Z",
    "updatedAt": null,
    "user_id": 1,
    "event_id": 2,
    "user": {
      "id": 1,
      "first_name": "Noé",
      "last_name": "Plantier",
      "birth_date": "1998-03-23",
      "address": "Pl Général de Gaulle 50000 Saint-Lô",
      "email": "template@gmail.com",
      "password": "$2b$10$MsPn54lAwKb6eliuhY5.Oe6LwcMKsia4sIO50/41D2ysO9SRXK3de",
      "password_confirmation": "$2b$10$gV8D9RnGjpdVuSqV640SpupOMG0KujQCs/4Grzq0ZUF57t/1vSFyi",
      "about": "Je suis un passionné de jardinage",
      "profil_picture": "https://avatars.githubusercontent.com/u/157673098?v=4",
      "createdAt": "2024-07-11T17:03:47.523Z",
      "updatedAt": null
    }
  }
]
 * @return {object} 404 - Event not found
 * @example response - 404 - Event not found
 * {
 * "error": "Event not found"
 * }
 * @return {string} 403 - Access denied - application/json
 * @example response - 403 - Access denied
 * {
 * "error": "Access denied, this his not your event"
 * }
 * @return {string} 400 - request error - application/json
 * @example response - 400 - request error
 * {
 * "error": "request error"
 * }
 * @returns {string} 401 - Unauthorized, invalid or missing token - application/json
 * @example response - 401 - Unauthorized, invalid or missing token
 * {
 * "error": "Unauthorized"
 * }
 */
router.get('/event/:id/participate/all', authenticateToken, participationController.listAllParticipation); //liste des participants



export default router;
