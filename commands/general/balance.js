const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
/**
 * A chest command that will display all the chest
 * that the user has, and can open using /open_chest.
 */

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('View your balance.'),

    async execute(interaction) {
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const playerBalance = foundPlayer.money;
        const moneyEmbed = new EmbedBuilder()
        .setTitle(`${interaction.user.username}'s Balance`)
        .setFooter({ text: `${playerBalance}`})
        .setColor(color.other);

        return interaction.reply({ embed: [moneyEmbed] });

    }
}