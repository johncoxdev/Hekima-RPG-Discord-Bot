const Sequelize = require('sequelize');
const sequelize = require('./initdb.js');

/**
 * Initialize the server database with 
 * basic information.
 */

const ServerDb = sequelize.define('serverdb', {
    server_id: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    server_boost_channel_id: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    daily_chest:{
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    weekly_chest:{
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});
module.exports = ServerDb;