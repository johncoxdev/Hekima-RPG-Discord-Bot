const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, upgrade } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
/**
 * Stats command that will show the players level for weapon/tool/armor
 */

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('View your tools/armor & jobs.')
        .addStringOption(opt => opt
            .setName("options")
            .setDescription("Choice between tools/armor or jobs")
            .setRequired(true)
            .setChoices({
                name: "tools",
                value: "items"
            },
            {
                name: "jobs",
                value: "perm_levels"
            })),

    async execute(interaction) {
        const chosenChoice = await interaction.options.getString("options");
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const statsEmbed = new EmbedBuilder();

        if (chosenChoice == "items"){
            const playersItems = foundPlayer.items
            statsEmbed.setTitle(`${interaction.user.username} Item's Stats`)
            let itemList = [];
            for ( item in playersItems ) {
                const expNeeded = (playersItems[item].level/upgrade[item].exp.x_exp_per_level)**upgrade[item].exp.y_gap_per_level;
                const itemDesc = (item == "helmet" || item == "chestplate" || item == "boots" ) ? `**Tier:** ${playersItems[item].tier}` : `**Tier:** ${playersItems[item].tier} **Level:** ${playersItems[item].level} \n**Experience:** ${playersItems[item].exp}/${expNeeded}`
                

                currItem = {
                    name: `${item}`,
                    value: itemDesc
                }
                itemList.push(currItem)          
            }
            statsEmbed.addFields(itemList)
            statsEmbed.setColor(color.other);
            return interaction.reply({ embeds: [statsEmbed] });
        } else if ( chosenChoice = "perm_levels") {
            console.log("yes")
        }
    }
}