// Ce fichier va servir à regrouper tous les modèles de notre application
import User from './user.models.js';
import Event from './event.models.js';
import Participation from './participation.models.js';

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

export default { User , Event , Participation}

