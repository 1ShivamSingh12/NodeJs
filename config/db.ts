const Sequelize = require('sequelize');

export const sequelize = new Sequelize('Traininh project', 'postgres', 'shivam123', {
  host: 'localhost',
  dialect: 'postgres',
});

