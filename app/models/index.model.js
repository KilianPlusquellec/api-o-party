// Ce fichier va servir à regrouper tous les modèles de notre application
import Event from './event.model.js';
import Participation from './participation.model.js';
import User from './user.model.js';

// Mon user à plusieurs participations
User.hasMany(Participation, { 
  foreignKey: 'user_id',
  as: 'participations'
});

// Mon event à plusieurs participants
Event.hasMany(Participation, {
  foreignKey: 'event_id', 
  as: 'participants'
});

// Participation appartient à un user
Participation.belongsTo(User, { 
  foreignKey: 'user_id',
  as: 'user' 
});

//Participation appartient à un event
Participation.belongsTo(Event, { 
  foreignKey: 'event_id',
  as: 'event'
});

//Un utilisateur à plusieurs events
User.hasMany(Event, {
  foreignKey: 'user_id',
  as: 'events'
});

//Un event appartient à un utilisateur
Event.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'host'
});

export { Event, Participation, User };
