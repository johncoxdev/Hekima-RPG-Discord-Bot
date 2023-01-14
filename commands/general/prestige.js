const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { color } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');

/**
 * This command allows the user to check if they're able
 * to prestige. If not, it will list all the items they
 * are needing to be tier 10 in order to presitge.
 */

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('prestige')
        .setDescription('Prestige and rest most info!'),

    async execute(interaction) {     
        /** 
         * We're going to check for all tools, and make sure they're at 
         * tier 10. If not, cannot exectute command!
        */

         const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
         let playerFirstTime = foundPlayer.first_time_user;
         let playerPrestige = foundPlayer.prestige;
         let playertimes = foundPlayer.times;
         let playerJobs = foundPlayer.jobs;
         let playerInventory = foundPlayer.inventory;
         let playerChest = foundPlayer.chest;
         const playerItems = foundPlayer.items;
         let notMaxed = "";
 
         // Checks if the user has all tier 10, if not, it will send the failed message.
         for (const [tool, value] of Object.entries(playerItems)){
             if (value.tier !== 10) {
                 notMaxed = notMaxed.concat(`${tool}, `)
                 continue;
             }
         }
 
         if (notMaxed.length !== 0){
             notMaxedEmbed = new EmbedBuilder()
             .setColor(color.failed)
             .setDescription(`You are missing **${notMaxed.replace("_", " ")}** to be tier 10 in order to \`/prestige\``);
             
             return interaction.reply({ embeds: [notMaxedEmbed] });
         }
         
         playerPrestige += 1;
 
         // Sends prestige message & updates database.
         prestigedImg = new AttachmentBuilder('game-assets/game-images/emote/prestige.png', { name: 'prestige.png' });
         prestigeEmbed = new EmbedBuilder()
             .setColor(color.success)
             .setTitle("【✸】 PRESTIGE 【✸】")
             .setDescription(`You have prestiged! You are now prestige **${playerPrestige}**\nMost information has been wiped! Information kept: inventory, chest & Job levels! Keep on grinding!`)
             .setThumbnail(`attachment://${prestigedImg.name}`);
 
         await PlayerDb.destroy({
             where: {
                 discord_user_id: interaction.user.id
             }
         });
 
         await PlayerDb.create({
             discord_user_id: interaction.user.id,
             first_time_user: playerFirstTime,
             prestige: playerPrestige,
             times: playertimes,
             jobs: playerJobs,
             inventory: playerInventory,
             chest: playerChest
         });

         return interaction.reply({ embeds: [prestigeEmbed], files: [prestigedImg] });
    }
}