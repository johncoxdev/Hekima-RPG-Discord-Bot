const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color } = require('../../game-assets/gameconfig.js');
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
            for ( item in playersItems ) {
                // create embed
            }
        } else if ( chosenChoice = "perm_levels") {

        }
    }
}