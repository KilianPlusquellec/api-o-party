import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/pg.client.js';

class Event extends Model {}

Event.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  finish_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  start_hour: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.GEOGRAPHY,
    allowNull: false,
  },
  privacy_type: {
    type: DataTypes.BOOLEEN,
    allowNull: false,
  },
  picture: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  max_attendee: {
    type: DataTypes.INT,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEEN,
    allowNull: false,
  },
  pmr_access: {
    type: DataTypes.BOOLEEN,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'event',
});

export default Event;

