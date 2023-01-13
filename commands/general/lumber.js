const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, IconEmoji } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const { getJobItems, getItemMoneyAndExp, updateBoosterInfo, checkIfToolPassLevel, checkIfJobPassLevel, actionJobEmbedBuilder } = require('../../game-assets/utilities.js');
/**
 * Job component of gaining experience points and money
 * Specificically for lumbering.
 */

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('lumber')
        .setDescription('Chop some trees and gather exp!'),

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
        const axe = playersItems['axe'];
        const axeTier = axe['tier'];
        let axeLevel = axe['level'];
        const axeExp = BigInt(axe['exp']);
        const lumberJob = playersJobs['lumber'];
        let lumberJobLevel = lumberJob['level'];
        const lumberJobExp = BigInt(lumberJob['exp']);

        await updateBoosterInfo(interaction.user.id);

        const itemsRetrieved = getJobItems("lumber", axeTier);
        const moneyExpRetrieved = getItemMoneyAndExp("lumber", itemsRetrieved, moneyBoost['amount'], expBoost['amount']);
        // We are just adding the exp to the current exp rather than updating the database to save time.
        const isToolPassLevel = checkIfToolPassLevel("axe", axeExp + BigInt(moneyExpRetrieved['exp']), axeLevel);
        const isJobPassLevel = checkIfJobPassLevel(lumberJobLevel, lumberJobExp + BigInt(moneyExpRetrieved['exp']));
        const actionTitle = "Lumber - You lumbered up..."
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
          actionDesc += `\n**Your lumber job has leveled up!** \n${lumberJobLevel} -> **${lumberJobLevel + 1}**`
          lumberJobLevel += 1;
        }
        
        if (isToolPassLevel) {
          actionDesc += `\n**Your tool has leveled up!** \n ${axeLevel} -> **${axeLevel + 1}**`
          axeLevel += 1;
        }

        const actionEmbed = actionJobEmbedBuilder(color.lumber, actionTitle, actionDesc);

        const newToolExp = axeExp + BigInt(moneyExpRetrieved['exp']);
        const newJobExp = lumberJobExp + BigInt(moneyExpRetrieved['exp']); 
        const newMoney = playersMoney + BigInt(moneyExpRetrieved['money']);
        
        playersItems['axe'] = {
          "tier": axeTier,
          "level": axeLevel,
          "exp": String(newToolExp)
        } 
        playersJobs['lumber'] = {
          "level": lumberJobLevel,
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