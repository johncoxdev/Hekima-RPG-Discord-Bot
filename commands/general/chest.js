const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, crate } = require('../../gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
/**
 * A chest command that will display all the chest
 * that the user has, and can open using /open_chest.
 */

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('chest')
        .setDescription('View the chest you have collected!'),

    async execute(interaction) {

        if (interaction.user.id !== "957825927109279775") return interaction.reply("You cant do this command!"); 

        // Chest command
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const chest = foundPlayer.chest

        const chestEmbed = new EmbedBuilder()
            .setColor(color.other)
            .setTitle(`${interaction.user.username} Inventory`)
            .setDescription("\u200B")
            .setFooter({ text: "To open a chest, please do \n/open_chest <chestType>" });

            for (const type of Object.keys(crate)){
                chestEmbed.data.description += `${crate[type]['emoji']} **| ${chest[type]} |** ${type.charAt(0).toUpperCase() + type.slice(1)} Chest\n`
            }

        interaction.reply({ embeds: [chestEmbed] })
    }
}