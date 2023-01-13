const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const sequelize = require('sequelize');
/**
 * A command that shows the leaderboards for money &
 * prestiges.
 */

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('leaderboard for money'),

    async execute(interaction) {
      const topThreePrestige = await PlayerDb.findAll({
        limit: 5,
        order: [['prestige', 'DESC']]
        });
      const topThreeMoney = await PlayerDb.findAll({
        limit: 5,
        order: [['money', 'DESC']]
        });
      const leaderboardEmbed = new EmbedBuilder()
      leaderboardEmbed.setTitle("Leaderboards!")
      leaderboardEmbed.addFields({
        name: "Prestige - Top 5",
        value: "\u200B",
        inline: true
    },{
        name: "Money - Top 5",
        value: "\u200B",
        inline: true
    });
    for ( user of topThreePrestige ){
      leaderboardEmbed.data.fields[0].value += `<@${user.discord_user_id}> - ${user.prestige} \n` 
    }
    for ( user of topThreeMoney ){
      leaderboardEmbed.data.fields[1].value += `<@${user.discord_user_id}> - $${Number(user.money).toLocaleString()} \n`
    }
      return interaction.reply({ embeds: [leaderboardEmbed] });
    }
}