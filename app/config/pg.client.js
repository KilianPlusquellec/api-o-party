import 'dotenv/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.PGURL, {
  define: {
    undefined: true,
  },
  logging: false,
});

export default sequelize;