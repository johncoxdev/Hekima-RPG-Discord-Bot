const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, upgrade, level_exp } = require('../../game-assets/gameconfig.js');
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
                name: "tools_and_armor",
                value: "tools"
            },
            {
                name: "jobs",
                value: "jobs"
            })),

    async execute(interaction) {
        const chosenChoice = await interaction.options.getString("options");
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const statsEmbed = new EmbedBuilder();
        let itemList = [];

        if (chosenChoice == "tools"){
            const playersItems = foundPlayer.items
            statsEmbed.setTitle(`${interaction.user.username} Item's Stats`)
            for ( item in playersItems ) {
                const expNeeded = Math.floor((playersItems[item].level/upgrade[item].exp.x_exp_per_level)**upgrade[item].exp.y_gap_per_level);

                const itemDesc = (item == "helmet" || item == "chestplate" || item == "boots" ) ? `**Tier:** ${playersItems[item].tier}` : `**Tier:** ${playersItems[item].tier} **Level:** ${playersItems[item].level} \n**Experience:** ${Number(playersItems[item].exp).toLocaleString()}/${(expNeeded).toLocaleString()}`
                

                currItem = {
                    name: `${item}`,
                    value: itemDesc
                }
                itemList.push(currItem)          
            }
        } else if ( chosenChoice == "jobs") {
          const playersJobs = foundPlayer.jobs;
          const playerPrestige = foundPlayer.prestige;
          statsEmbed.addFields({name: '**Prestige:** ', value: `${playerPrestige}`});

          // loop through player's jobs and add them to stats.
          for ( job in playersJobs ) {
            const expNeeded = Math.floor((playersJobs[job].level/level_exp.x_exp_per_level)**level_exp.y_gap_per_level);
            const jobDesc = `**Level:** ${playersJobs[job].level} \n**Experience:** ${Number(playersJobs[job].exp).toLocaleString()}/${Number(expNeeded).toLocaleString()}`

            currItem = {
              name: `${job}`,
              value: jobDesc
            }
            itemList.push(currItem) 
          }
        }
        statsEmbed.setFields(itemList)
        statsEmbed.setColor(color.other);
        return interaction.reply({ embeds: [statsEmbed] });
    }
}