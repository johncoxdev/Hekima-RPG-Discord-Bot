const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color } = require('../../gameconfig.js');

/**
 * Developer command that is used for testing.
 */

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command'),

    async execute(interaction) {
        const serverOwnerEmbed = new EmbedBuilder()
            .setAuthor({ name: "Hekima RPG" })
            .setColor(color.success)
            .setFooter({ text: "Thank you for inviting Hekima RPG to your server! Make sure to use /settings to add some additional features (optional) for your server!" })

        interaction.reply({ embeds: [serverOwnerEmbed] })
    }
}