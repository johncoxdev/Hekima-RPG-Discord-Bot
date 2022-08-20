const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, invitems } = require('../../game-assets/gameconfig.js');
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
            .setDescription("\u200B") //Use a unicode to set the description as empty
            .setFooter({ text: "To use an item, please do \n/use_item <ID#>" })

            //I personally just set 'x' as 1 because I didn't want to +1. It slightly makes
            //more confusing because you do have to subtract the 12 by the start of x, 1.
            for (x=1; x<12; x++){
                inventoryEmbed.data.description += `${invitems['emoji'][x]} **| \`ID: ${x}\` | ${inv[x]} |** ${invitems['name'][x]}\n` 
            }

        interaction.reply({ embeds: [inventoryEmbed] })
    }
}