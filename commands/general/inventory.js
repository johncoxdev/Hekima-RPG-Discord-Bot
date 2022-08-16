const { EmbedBuilder, SlashCommandBuilder, bold } = require('discord.js');
const { color } = require('../../gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
/**
 * An inventory command that will show all the players
 * stored items that are within the database.
 * Note: I know the description is rather messy, but I
 * will look for better/cleaner alternatives later.
 */

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('Check your inventory items!'),

    async execute(interaction) {

        //inventory command
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const inv = foundPlayer.inventory

        const inventoryEmbed = new EmbedBuilder()
            .setColor(color.other)
            .setTitle(`${interaction.user.username} Inventory`)
            .setDescription(`<:ID_1:1007754508329287720> **| \`ID: 01\` | ${inv["1"]} |** XP Booster 1.25x (10 - 15 mins) \n<:ID_2:1007754509688254525> **| \`ID: 02\` | ${inv["2"]} |** XP Booster 1.5x (10 - 20 mins) \n<:ID_3:1007754510711656518> **| \`ID: 03\` | ${inv["3"]} |** XP Booster 2x (10 - 25 mins) \n<:ID_4:1007754511475032105> **| \`ID: 04\` | ${inv["4"]} |** XP Booster 2.5x (15 - 20 mins) \n<:ID_5:1007754512666206381> **| \`ID: 05\` | ${inv["5"]} |** XP Booster 3x (15 - 25 mins) \n<:ID_6:1007754513828020304> **| \`ID: 06\` | ${inv["6"]} |** XP Booster 5x (15 - 30 mins) \n<:ID_7:1007754558203777077> **| \`ID: 07\` | ${inv["7"]} |** Money Booster 1.25x (10 - 20 mins) \n<:ID_8:1007754559931809812> **| \`ID: 08\` | ${inv["8"]} |** Money Booster 1.25x (15 - 30 mins) \n<:emerald:1007503844286136392> **| \`ID: 09\` | ${inv["9"]} |** Emerald \n<:firestone:1007503845808676896> **| \`ID: 10\` | ${inv["10"]} |**Firestone \n<:crystal:1007503842948165652> **| \`ID: 11\` | ${inv["11"]} |** Crystal`)
            .setFooter({ text: "To use an item, please do \n/use_item <ID#>" })

        interaction.reply({ embeds: [inventoryEmbed] })
    }
}