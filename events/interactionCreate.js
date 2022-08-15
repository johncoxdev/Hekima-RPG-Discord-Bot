const { InteractionType } = require('discord.js');

/**
 * Initialized when a command interaction is made
 * from a user. It will then exectute the command
 * that is put. 
 */

module.exports = {
	name: 'interactionCreate',
	execute(interaction, commands) {
		if (interaction.type !== InteractionType.ApplicationCommand) return;

		const command = commands.get(interaction.commandName);
		if (!command) return;

		try {
			command.execute(interaction);
		} catch (error) {
			console.error(error);
		}	
	},
};