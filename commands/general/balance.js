const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
/**
 * Balance command showing the user's money balance
 */

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('View your balance.'),

    async execute(interaction) {
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const playerBalance = BigInt(foundPlayer.money);
        const moneyEmbed = new EmbedBuilder()
        .setTitle(`${interaction.user.username}'s Balance`)
        .setFooter({ text: `$${playerBalance.toLocaleString()}`})
        .setColor(color.other);

        return interaction.reply({ embeds: [moneyEmbed] });
5
    }
}