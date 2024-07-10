import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/pg.client.js';

class Participation extends Model {}

Participation.init({
  approval: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  tableName: 'participation',
});

export default Participation;
