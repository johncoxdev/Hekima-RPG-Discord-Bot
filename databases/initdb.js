const Sequelize = require('sequelize');

/**
 * Initialize the database with basic information
 */ 

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'hekimadb.sqlite',
});

module.exports = sequelize;