const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, IconEmoji } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const { getJobItems, getItemMoneyAndExp, updateBoosterInfo, checkIfToolPassLevel, checkIfJobPassLevel, actionJobEmbedBuilder } = require('../../game-assets/utilities.js');
/**
 * Job component of gaining experience points and money
 * Specificically for hunting.
 */

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('hunt')
        .setDescription('Hunt for food and gather exp!'),

    async execute(interaction) {
      /*  
        1. We are going to get a random experience and add it to the database
        2. We are then going to check if the experience passes the exp threshold for the level
        3. If the exp passes the threshold, then we're going to announce that they have leveled up the job/tool
        4. We are going to update the database if needed
        Notes: 
        - Most of these are going to be in the utilities.js because they repeat for the jobs (hunt, farm, fish, lumber, mine)
        - Tools need to level to 100 (then they can upgrade the tool)
        - Job levels go infinetely 
      */
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const playersJobs = foundPlayer.jobs;
        const playersItems = foundPlayer.items;
        const playersMoney = BigInt(foundPlayer.money);
        const playersMultipliers = foundPlayer.multipliers;
        const expBoost = playersMultipliers['exp_multiplier'];
        const moneyBoost = playersMultipliers['money_multiplier'];
        const sword = playersItems['sword'];
        const swordTier = sword['tier'];
        let swordLevel = sword['level'];
        const swordExp = BigInt(sword['exp']);
        const bow = playersItems['bow'];
        const bowTier = bow['tier'];
        let bowLevel = bow['level'];
        const bowExp = BigInt(bow['exp']);
        const huntJob = playersJobs['hunt'];
        let huntJobLevel = huntJob['level'];
        const huntJobExp = BigInt(huntJob['exp']);

        await updateBoosterInfo(interaction.user.id);

        const itemsRetrieved = getJobItems("hunt", swordTier);
        const moneyExpRetrieved = getItemMoneyAndExp("hunt", itemsRetrieved, moneyBoost['amount'], expBoost['amount']);
        // We are just adding the exp to the current exp rather than updating the database to save time.
        const isToolPassLevel1 = checkIfToolPassLevel("sword", swordExp + BigInt(moneyExpRetrieved['exp']), swordLevel);
        const isToolPassLevel2 = checkIfToolPassLevel("bow", swordExp + BigInt(moneyExpRetrieved['exp']), swordLevel);
        const isJobPassLevel = checkIfJobPassLevel(huntJobLevel, huntJobExp + BigInt(moneyExpRetrieved['exp']));
        const actionTitle = "hunt - You hunted..."
        let actionDesc = `\u200B`;

        for (const [item, amount] of Object.entries(itemsRetrieved)){
          actionDesc += `${IconEmoji['emoji'][item]} **|** ${item}: ${amount} \n`
        }

        if (moneyExpRetrieved['boostMoney'] > 0) {
          actionDesc += `\n**Boost Money:** +${moneyExpRetrieved['boostMoney']}`          
        }

        actionDesc += `\n**Total Money Earned:** $${moneyExpRetrieved['money']}`

        if (moneyExpRetrieved['boostExp'] > 0) {
          actionDesc += `\n**Boost Exp:** +${moneyExpRetrieved['boostExp']}`          
        }

        actionDesc += `\n**Total Exp Earned:** +${moneyExpRetrieved['exp']}exp`

        if (isJobPassLevel) {
          actionDesc += `\n**Your hunt job has leveled up!** \n${huntJobLevel} -> **${huntJobLevel + 1}**`
          huntJobLevel += 1;
        }
        
        if (isToolPassLevel1) {
          actionDesc += `\n**Your sword has leveled up!** \n ${swordLevel} -> **${swordLevel + 1}**`
          swordLevel += 1;
        }

        if (isToolPassLevel2) {
            actionDesc += `\n**Your bow has leveled up!** \n ${bowLevel} -> **${bowLevel + 1}**`
            bowLevel += 1;
          }

        const actionEmbed = actionJobEmbedBuilder(color.hunt, actionTitle, actionDesc);
        const newToolExp1 = swordExp + BigInt(moneyExpRetrieved['exp']);
        const newToolExp2 = bowExp + BigInt(moneyExpRetrieved['exp']);
        const newJobExp = huntJobExp + BigInt(moneyExpRetrieved['exp']); 
        const newMoney = playersMoney + BigInt(moneyExpRetrieved['money']);
        
        playersItems['sword'] = {
          "tier": swordTier,
          "level": swordLevel,
          "exp": String(newToolExp1)
        }
        playersItems['bow'] = {
            "tier": bowTier,
            "level": bowLevel,
            "exp": String(newToolExp2)
        } 
        playersJobs['hunt'] = {
          "level": huntJobLevel,
          "exp": String(newJobExp)
        }

        await PlayerDb.update({
          money: String(newMoney),
          items: playersItems,
          jobs: playersJobs
        }, { where: {
            discord_user_id: interaction.user.id
          }
        })

        interaction.reply({ embeds: [actionEmbed] });
    }
}