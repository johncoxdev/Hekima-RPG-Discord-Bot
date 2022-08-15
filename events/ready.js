const sequelize = require('../databases/initdb.js');
const { PlayerDb } = require('../databases/playerdb.js');

/**
 * Initialized when the client is declared ready.
 * It will sync all databases and display the 
 * amount of members in the database.
 */

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		
		console.log(`${client.user.tag} is online. \nSyncing database...`)
		// force: true = Will remake a new database when starting the bot.
		sequelize.sync({ force: true })
		console.log("Database has been sync'd!")
		
		let DbAmt = await PlayerDb.count({
			col: 'discord_user_id'
		});
		DbAmt = DbAmt.toLocaleString();
		
		client.user.setActivity(`${DbAmt} members`, { type: 'WATCHING' })
	},
};