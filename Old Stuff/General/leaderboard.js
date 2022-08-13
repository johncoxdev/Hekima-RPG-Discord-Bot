const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Colors } = require('discord.js');
const { Player } = require('../../databases/playerdb.js');

module.exports = {
    enabled: true,
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Leaderboards for all categories.'),

    async execute(interaction) {
        const RPSTopWins = await Player.findAll({
            limit: 3,
            order: [['userWinsRPS', 'DESC']]
        });

        const leaderboardEmbed = new EmbedBuilder()
        .setTitle('Leaderboards')
        .setColor(Colors.DarkPurple)
        .addFields([
            {
                name: "Top Bump Points",
                value: "loading...",
                inline: false
            },
        ])

        for (let i = 0; i < leaderboardEmbed.data.fields.length; i++){
            leaderboardEmbed.data.fields[i].value = leaderboardEmbed.data.fields[i].value.split("loading...").pop()
        }

        for (const mem of BumpTop){
            leaderboardEmbed.data.fields[0].value = leaderboardEmbed.data.fields[0].value.split("loading...").pop()
            leaderboardEmbed.data.fields[0].value = leaderboardEmbed.data.fields[0].value.concat(`<@${mem.userID}> - ${mem.userTotalBumps}\n`)   
        }
        return interaction.reply({ embeds: [leaderboardEmbed] })
    },
};