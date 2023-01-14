const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { color } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const { ServerDb } = require('../../databases/serverdb.js');
/**
 * Settings command for staff members. (Permission required: Administrator)
 */

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Settings to enable game features.')
        .addStringOption( opt => opt
            .setName("type")
            .setDescription("Choose weekly or daily command")
            .setRequired(true)
            .setChoices({
                name: 'daily',
                value: "Daily"
            }, {
                name: "weekly",
                value: "Weekly"
            }))
        .addBooleanOption( opt => opt
            .setName("enabled")
            .setDescription("Enable (true) or disable (false) command")
            .setRequired(true)),

    async execute(interaction) {

        const hasAdmin = (interaction.member.permissions.has(PermissionFlagsBits.Administrator)) ? true : false;
        const settingsEmbed = new EmbedBuilder();

        if (!hasAdmin) {
            settingsEmbed.setColor(color.failed)
            settingsEmbed.setTitle("You missing permission: `ADMINISTRATOR`!");
            return interaction.reply({ embeds: [settingsEmbed] });
        }

        const foundServer = await ServerDb.findOne({ where: { server_id: interaction.guild.id } });
        const serverDaily = foundServer.daily_chest;
        const serverWeekly = foundServer.weekly_chest;
        const userChoice = interaction.options.getString("type");
        const userBoolean = interaction.options.getBoolean("enabled");

        if ((userChoice === "Daily" && userBoolean === serverDaily) || (userChoice === "Weekly" && userBoolean === serverWeekly)) {
            settingsEmbed.setColor(color.failed)
            settingsEmbed.setTitle("Settings not changed!")
            settingsEmbed.setDescription("The settings are the same, so nothing was changed!");
            return interaction.reply({ embeds: [settingsEmbed] })
        }

        if (userChoice === "Daily"){

            await ServerDb.update({
                daily_chest: userBoolean  
            },{
                where: {
                    server_id: interaction.guild.id
                }
            });

        } else if (userChoice === "Weekly") {

            await ServerDb.update({
                weekly_chest: userBoolean  
            },{
                where: {
                    server_id: interaction.guild.id
                }
            });

        }

        settingsEmbed.setColor(color.success)
        settingsEmbed.setTitle("Settings Updated!")
        settingsEmbed.setDescription(`${userChoice} chest command has been updated to **${userBoolean}**`)

        return interaction.reply({ embeds: [settingsEmbed] });
    }
}