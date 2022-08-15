const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { color } = require('../../gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');

/**
 * This command allows the user to check if they're able
 * to prestige. If not, it will list all the items they
 * are needing to be tier 10 in order to presitge.
 */

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('prestige')
        .setDescription('Prestige and rest most info!'),

    async execute(interaction) {     
        
        /** 
         * We're going to check for all tools, and make sure they're at 
         * tier 10. If not, cannot exectute command!
        */

         const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
         const items = foundPlayer.items;
         let permLevels = foundPlayer.perm_levels;
         const prestigeLevel = permLevels['prestige'];
         let notMaxed = "";
 
         // Checks if the user has all tier 10, if not, it will send the failed message.
         for (const [tool, value] of Object.entries(items)){
             if (value.tier !== 10) {
                 notMaxed = notMaxed.concat(`${tool}, `)
                 continue;
             }
         }
 
         if (notMaxed.length !== 0){
             notMaxedEmbed = new EmbedBuilder()
             .setColor(color.failed)
             .setDescription(`You are missing ${notMaxed.replace("_", " ")} to be tier 10 in order to \`/prestige\``);
             
             return interaction.reply({ embeds: [notMaxedEmbed] });
         }
 
 
         // Sends prestige message & updates database.
         prestigedImg = new AttachmentBuilder('z-game-images/emote/prestige.png', { name: 'prestige.png' });
         prestigeEmbed = new EmbedBuilder()
             .setColor(color.success)
             .setTitle("【✸】 PRESTIGE 【✸】")
             .setDescription(`You have prestiged! You are now prestige **${prestigeLevel + 1}**\nAll tool information has been whiped. Only your Job levels have stayed! Keep on grinding survivor!`)
             .setThumbnail(`attachment://${prestigedImg.name}`);
         
         await interaction.reply({ embeds: [prestigeEmbed], files: [prestigedImg] });
        
         permLevels.prestige += 1;
 
         await PlayerDb.destroy({
             where: {
                 discord_user_id: interaction.user.id
             }
         });
 
         await PlayerDb.create({
             discord_user_id: interaction.user.id,
             perm_levels: permLevels
         });

    }
}