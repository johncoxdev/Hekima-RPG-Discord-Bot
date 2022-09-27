const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const { event, color, itemInfo } = require('../../game-assets/gameconfig.js');
const { isQuestComplete, getQuestLevel, addChest, giveRandomMoney } = require('../../game-assets/utilities.js');

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

        const questSurvivalRates = playerSurvivalRatePerQuest(playerItems, event['quest'])

        const questMenu = new EmbedBuilder()
            .setTitle("Quest Menu")
            .setDescription("\u200B")
            .setColor(color.other);

        // If quest is complete, set player data in db, and return Boolean.
        if (await isQuestComplete(interaction.user.id, playerQuest)){

            //if the player died, just give them some exp
            if (!didPlayerSurvive(playerItems, playerQuest['level'])) {
                deathImage = new AttachmentBuilder('game-assets/game-images/emote/dead.png', { name: 'dead.png' });
                const questFailed = new EmbedBuilder()
                    .setTitle("Quest Failed!")
                    .setDescription(`You died on your quest! Here is some petty petty cash for your efforts\n**+ $${await giveRandomMoney(interaction.user.id)}**`)
                    .setColor(color.failed)
                    .setThumbnail(`attachment://${deathImage.name}`)

                interaction.channel.send({ embeds: [questFailed], files: [survivedImg] })
            } else {

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
            }

            interaction.channel.send({ embeds: [questCompleteEmbed], files: [survivedImg] })
        } else {
            questMenu.data.description = `You're currently on a quest!\n You're quest will finish in, <t:${playerQuest['time']}:r>`
        }

        questMenu.data.description = `**Quest Menu**
        ${itemInfo['emoji']['quest1']} - 1H - Your Survival Rate: 25%
        ${itemInfo['emoji']['quest2']} - 6H - Your Survival Rate:
        ${itemInfo['emoji']['quest3']} - 12H - Your Survival Rate: 
        ${itemInfo['emoji']['quest4']} - 24H - Your Survival Rate: 
        ${itemInfo['emoji']['quest5']} - 48H - Your Survival Rate: `

        // From this point on, you're then going to act like a normal menu!
        


    }
}

function playerSurvivalRatePerQuest(playersItems, gameQuests){

    for (const diffLevel of Object.entries(gameQuests)) {

    }

}

function playerSurvivalRate (playerItems) {
    const playerHelmet = playersItems['helmet']['tier'] * 2;
    const playerChestplate = playersItems['chestplate']['tier'] * 2;
    const playerBoots = playersItems['boots']['tier'] * 2;
    return playerHelmet + playerChestplate + playerBoots;
}

async function didPlayerSurvive(playersItems, questLevel) {
    const flatSurvivalRate = event['quest'][questLevel][survival_rate];
    const plyrSurvivalRate = playerSurvivalRate(playerItems)
    const totalSurvivalRate = flatSurvivalRate + playerHelmet + playerChestplate + playerBoots;
    const randomNumber = Math.floor(Math.random() * 100);

    return randomNumber <= totalSurvivalRate;
}

async function isQuestComplete(userId, playerQuest){
    const currentTime = Math.floor(Date.now()/1000);
    const questActive = playerQuest['active'];
    const questTime = playerQuest['time'];
    
    if (questActive && (currentTime > questTime)){

        playerQuest = {
            "active": false,
            "level": 0,
            "time": 0
        }

        await PlayerDb.update({
            quests: playerQuest
        }, {
            where: { discord_user_id: userId}
        });
        return true;
    }
    return false;
}