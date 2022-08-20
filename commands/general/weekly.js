const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, crate } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const { ServerDb } = require('../../databases/serverdb.js')
/**
 * A command that will give a uncommon chest to a user weekly.
 * The server owners are allowed to enable/disable it. If
 * enabled continue, if not dont execute command!
 */

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('weekly')
        .setDescription('Get your weekly chest!'),

    async execute(interaction) {

        //weekly command

        //First check if the command is enabled
        const foundServer = await ServerDb.findOne({ where: { server_id: interaction.guildId } })
        const dailyEnabled = foundServer.weekly_chest;
        const notEnabledEmbed = new EmbedBuilder()
            .setTitle("/weekly is not enabled!")
            .setColor(color.failed);

        if (!dailyEnabled) return interaction.reply({ embeds: [notEnabledEmbed] });

        //Get players time and check if it's ready, if not return
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const playerTimes = foundPlayer.times;
        const dailyCooldown = playerTimes['weekly_claim'];
        let currentTime = Math.floor(Date.now()/1000);
        const notReady = new EmbedBuilder()
            .setTitle("Still on cooldown!")
            .setColor(color.failed)
            .setDescription(`Please wait <t:${dailyCooldown}:R>`)

        if (currentTime < dailyCooldown) return interaction.reply({ embeds: [notReady] });

        //Get the chest, add it to the players database.
        const chests = foundPlayer.chest;
        const newDate = currentTime += (3600 * 24) * 7;
        chests['uncommon'] += 1;
        playerTimes['weekly_claim'] = newDate

        await PlayerDb.update({
            chest: chests,
            times: playerTimes
        }, {
            where: {
                discord_user_id: interaction.user.id
            }
        });

        const chestGivenEmbed = new EmbedBuilder()
            .setDescription(`${crate['uncommon']['emoji']} **+1** Uncommon Chest`)
            .setColor(color.success)
            .setFooter({ text: "Chest added to your /chest" });

        interaction.reply({ embeds: [chestGivenEmbed] })
    }
}