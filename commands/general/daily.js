const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, crate } = require('../../gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const { ServerDb } = require('../../databases/serverdb.js')
/**
 * A command that will give a common chest to a user daily.
 * The server owners are allowed to enable/disable it. If
 * enabled continue, if not dont execute command!
 */

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Get your daily chest!'),

    async execute(interaction) {

        //daily command

        //First check if the command is enabled
        const foundServer = await ServerDb.findOne({ where: { server_id: interaction.guildId } })
        const dailyEnabled = foundServer.daily_chest;
        const notEnabledEmbed = new EmbedBuilder()
            .setTitle("/daily is not enabled!")
            .setColor(color.failed);

        if (!dailyEnabled) return interaction.reply({ embeds: [notEnabledEmbed] });

        //Get players time and check if it's ready, if not return
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const playerTimes = foundPlayer.times;
        const dailyCooldown = playerTimes['daily_claim'];
        let currentTime = Math.floor(Date.now()/1000);
        const notReady = new EmbedBuilder()
            .setTitle("Still on cooldown!")
            .setColor(color.failed)
            .setDescription(`Please wait <t:${dailyCooldown}:R>`)

        if (currentTime < dailyCooldown) return interaction.reply({ embeds: [notReady] });

        //Get the chest, add it to the players database.
        const chests = foundPlayer.chest;
        const newDate = currentTime += 3600 * 24;
        chests['common'] += 1;
        playerTimes['daily_claim'] = newDate

        await PlayerDb.update({
            chest: chests,
            times: playerTimes
        }, {
            where: {
                discord_user_id: interaction.user.id
            }
        });

        const chestGivenEmbed = new EmbedBuilder()
            .setDescription(`${crate['common']['emoji']} **+1** Common Chest`)
            .setColor(color.success)
            .setFooter({ text: "Chest added to your /chest" });

        interaction.reply({ embeds: [chestGivenEmbed] })
    }
}