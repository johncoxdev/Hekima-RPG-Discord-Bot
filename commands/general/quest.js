const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const { event, color, itemInfo } = require('../../game-assets/gameconfig.js');
const { addChest, giveRandomMoney } = require('../../game-assets/utilities.js');

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

        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const playerQuest = foundPlayer.quests;
        const playerItems = foundPlayer.items;

        const questSurvivalRates = playerSurvivalRatePerQuest(playerItems, event['quest'])

        const questMenu = new EmbedBuilder()
            .setTitle("Quests")
            .setDescription("\u200B")
            .setFooter({ text: "\u200B" })
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

                const questLevel = playerQuest['level'];

                const chestAmount = event['quest'][questLevel]['reward_amount'];
                const chestTypes = event['quest'][questLevel]['reward'];

                for (x = 0; x < chestAmount; x++){
                    let resChestType = chestTypes[Math.floor(Math.random() * chestTypes.length)];
                    await addChest(interaction.user.id, resChestType)
                    questCompleteEmbed.data.description += `${itemInfo['emoji'][resChestType]} **1x** ${itemInfo['name'][resChestType]}`
                }
                interaction.channel.send({ embeds: [questCompleteEmbed], files: [survivedImg] })
            }

        } else {
            questMenu.data.description = `You're currently on a quest!\n You're quest will finish on, <t:${playerQuest['time']}:F>\n`
        }

        
        const playerSurvivalPercentage = playerSurvivalRatePerQuest(playerItems, event['quest'])

        questMenu.data.description += `**Quest Menu**
        ${itemInfo['emoji']['quest1']} ** | ** Time: 1H ** | ** Your Survival Rate: ${playerSurvivalPercentage[0]}
        ${itemInfo['emoji']['quest2']} ** | ** Time: 6H ** | ** Your Survival Rate: ${playerSurvivalPercentage[1]}
        ${itemInfo['emoji']['quest3']} ** | ** Time: 12H ** | ** Your Survival Rate: ${playerSurvivalPercentage[2]}
        ${itemInfo['emoji']['quest4']} ** | ** Time: 24H ** | ** Your Survival Rate: ${playerSurvivalPercentage[3]}
        ${itemInfo['emoji']['quest5']} ** | ** Time: 48H ** | ** Your Survival Rate: ${playerSurvivalPercentage[4]}`

        questMenu.data.footer.text = "To do a quest do /start_quest"
        
        return interaction.reply({ embeds: [questMenu] });
    }
}

function playerSurvivalRatePerQuest(pItems, gQuest){
    const percentages = [];
    for (const questLvl of Object.values(gQuest)) {
        const baseSurvivalRate = questLvl['survival_rate'];
        const playerArmorRate = playerSurvivalRate(pItems);
        const totalSurvivalRate = baseSurvivalRate + playerArmorRate;
        percentages.push(totalSurvivalRate) ;
    }
    return percentages;
}

function playerSurvivalRate (playersItems) {
    const playerHelmet = playersItems['helmet']['tier'];
    const playerChestplate = playersItems['chestplate']['tier'];
    const playerBoots = playersItems['boots']['tier'];
    return playerHelmet + playerChestplate + playerBoots;
}

async function didPlayerSurvive(playersItems, questLevel) {
    const flatSurvivalRate = event['quest'][questLevel]['survival_rate'];
    const plyrSurvivalRate = playerSurvivalRate(playersItems)
    const totalSurvivalRate = flatSurvivalRate + plyrSurvivalRate;
    const randomNumber = Math.floor(Math.random() * 100);

    return randomNumber <= totalSurvivalRate;
}

async function isQuestComplete(userId, playerQuest){
    const currentTime = Math.floor(Date.now()/1000);
    const questActive = playerQuest['active'];
    const questTime = playerQuest['time'];
    
    console.log(currentTime, questTime)
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