const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const { event, color, itemInfo } = require('../../game-assets/gameconfig.js');
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

        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: userId} });
        const playerQuest = foundPlayer.quests;
        const playerItems = foundPlayer.items;

        const QuestMenu = new EmbedBuilder()
            .setTitle("Quest Menu")
            .setColor(color.other)
            .setFooter({ text: ""})
        
        if (playerQuest['active']){
            QuestMenu.setDescription(`You're currently on a quest!\n You're quest will finish in, <t:${playerQuest['time']}:r>`)
        }
        // If quest is complete, set player data in db, and return Boolean.
        if (await isQuestComplete(interaction.user.id)){

            //if the player died, just give them some exp
            if (!didPlayerSurvive(playerItems, playerQuest['level'])) {
                deathImage = new AttachmentBuilder('game-assets/game-images/emote/dead.png', { name: 'dead.png' });
                const questFailed = new EmbedBuilder()
                    .setTitle("Quest Failed!")
                    .setDescription(`You died on your quest! Here is some exp for your hard work! \n**+${await giveExp(interaction.user.id, "armor")}**`)
                    .setColor(color.failed)
                    .setThumbnail(`attachment://${deathImage.name}`)

                interaction.reply({ embeds: [questFailed], files: [survivedImg] })
            }

            //If survived, send message and get rewards.
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
                questCompleteEmbed.data.description += `${itemInfo['emoji'][resChestType]} **1x** ${itemInfo['name'][resChestType]}`
            }

            interaction.reply({ embeds: [questCompleteEmbed], files: [survivedImg] })

        }

        // From this point on, you're then going to act like a normal menu!


    }
}


async function didPlayerSurvive(playersItems, questLevel) {
    const flatSurvivalRate = event['quest'][questLevel][survival_rate];
    const playerHelmet = playersItems['helmet']['tier'] * 2;
    const playerChestplate = playersItems['chestplate']['tier'] * 2;
    const playerBoots = playersItems['boots']['tier'] * 2;
    const totalSurvivalRate = flatSurvivalRate + playerHelmet + playerChestplate + playerBoots;
    const randomNumber = Math.floor(Math.random() * 100);

    if (randomNumber <= totalSurvivalRate) return true;
    return false;
}