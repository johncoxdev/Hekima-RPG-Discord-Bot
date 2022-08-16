const { InteractionType, EmbedBuilder, codeBlock } = require('discord.js');
const { PlayerDb, addMember } = require('../databases/playerdb');
const { color } = require('../gameconfig');

/**
 * Initialized when a command interaction is made
 * from a user. It will first check if the user is
 * enough time has passed from their previous command.
 * There is a 5 second cooldown to reduce API spamming.
 */

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, commands) {

		//check if the interaction is a command
		if (interaction.type !== InteractionType.ApplicationCommand) return;

		//check if the command is the bot's command
		const command = commands.get(interaction.commandName);
		if (!command) return;

		
		//get time from database, and if they're not a part of it. Add them & set the right foundPlayer instance
		let foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } })

		if (!foundPlayer) {
			foundPlayer = await addMember(interaction.user.id);
			foundPlayer = foundPlayer[0];
		};

        //If member is a first time user, then send them this message and update the database.
        const firstTimeEmbed = new EmbedBuilder()
            .setColor(color.success)
            .setTitle(`Welcome to Hekima RPG, ${interaction.user.username}!`)
            .setDescription(codeBlock('ansi', "[37mWelcome! I see you're a first time user! Well Hekima RPG is a discord command based game that is all about grinding to the highest level you want to achieve. The game includes various things from Quest, Weapon Tier Upgrades, Multipliers, and more! The best command to do is [0m[31m/game_help[0m"))
            .setThumbnail(interaction.client.user.displayAvatarURL())

		if (foundPlayer.first_time_user) await interaction.channel.send({ embeds: [firstTimeEmbed] })	

        await PlayerDb.update({
            first_time_user: false
        }, 
        {
            where: {
                discord_user_id: interaction.user.id
            }
        });
		
		try {
			command.execute(interaction);
		} catch (error) {
			console.error(error);
		}	
	},
};