const { ServerDb } = require('../databases/serverdb.js');
const { PlayerDb } = require('../databases/playerdb.js');
const { addChest } = require('../game-assets/utilities.js');

/**
 * Initialized when the client is declared ready.
 * It will sync all databases and display the 
 * amount of members in the database.
 */

module.exports = {
	name: 'messageCreate',
	async execute(message) {
        const foundServer = await ServerDb.findOne({ where: { server_id: message.guild.id } });

        if (!foundServer) return;

        if (message.webhookId !== foundServer.webhook_id) return;

        // const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: message.author.id } });

        // if (!foundPlayer) return;

        const inv = foundPlayer.inventory

        console.log(message)

        // addChest(message.author)
	},
};