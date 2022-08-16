const { EmbedBuilder } = require("discord.js");
const { color } = require('../gameconfig.js');

/**
 * Initiated when the client joins a server, it will
 * add all members from the server it has joined into
 * the database. Ignoring all duplicates & bots.
 */
module.exports = {
	name: 'guildCreate',
	once: false,
	async execute(guild) {

        // Get the owner & send them a message
        const serverOwner = await guild.fetchOwner();

        const serverOwnerEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hekima RPG" })
        .setColor(color.success)
        .setDescription("Thank you for inviting Hekima RPG to your server! Make sure to use /settings to add some additional features (optional) for your server!");
             
        serverOwner.send({ embeds: [serverOwnerEmbed] });
	},
};