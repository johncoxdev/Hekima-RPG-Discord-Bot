const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const { event, color, invitems } = require('../../game-assets/gameconfig.js');
const { isQuestComplete, getQuestLevel, addChest } = require('../../game-assets/utilities.js');

/**
 * This command is going to hold the following information.
 * 1) Check if a quest is active and complete, if so- reward them based on the quest.
 * 2) If any active quest are on, if so- display the quest type.
 * 3) Types of quest - Base survival rate | User's surivival rate based on armor
 */

module.exports = {
    category: "General",
    data: new SlashCommandBuilder()
        .setName('quest')
        .setDescription('Open quest menu.'),
    async execute(interaction) {

        
        
        
        // Checks if quest is active and complete
        if (await isQuestComplete(interaction.user.id)){
            // await didPlayerSurvive(interaction.user.id)
            //If dead, dead embed.

            //If survived, get rewards.
            survivedImg = new AttachmentBuilder('game-assets/game-images/emote/survive.png', { name: 'survive.png' });
            const questCompleteEmbed = new EmbedBuilder()
                .setTitle("Quest Completed!")
                .setDescription("You survived and completed your quest! Here is your rewards!\n")
                .setColor(color.success)
                .setThumbnail(`attachment://${survivedImg.name}`)

            const questLevel = await getQuestLevel(interaction.user.id);

            const chestAmount = event['quest'][questLevel]['reward_amount'];
            const chestTypes = event['quest'][questLevel]['reward'];

            for (x = 0; x < chestAmount; x++){
                let resChestType = chestTypes[Math.floor(Math.random() * chestTypes.length)];
                await addChest(interaction.user.id, resChestType)
                questCompleteEmbed.data.description += `${invitems['emoji'][resChestType]} **1x** ${invitems['name'][resChestType]}`
            }

            interaction.reply({ embeds: [questCompleteEmbed], files: [survivedImg] })

        }

        // From this point on, you're then going to act like a normal menu!


    }
    
}