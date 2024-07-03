const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/client-sequelize');

class User extends Model {}

User.init({
  first_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'user',
});

module.exports = Answer;

"first_name" text NOT NULL,
"last_name" text NOT NULL,
"birth_date" DATE NOT NULL,
"address" text NOT NULL,
"email" email NOT NULL UNIQUE,
"password" text NOT NULL,
"about" text,
"profil_picture" text,