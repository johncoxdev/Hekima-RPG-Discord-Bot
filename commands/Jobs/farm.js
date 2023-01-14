const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, IconEmoji } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const { getJobItems, getItemMoneyAndExp, updateBoosterInfo, checkIfToolPassLevel, checkIfJobPassLevel, actionJobEmbedBuilder } = require('../../game-assets/utilities.js');
/**
 * Job component of gaining experience points and money
 * Specificically for farming.
 */

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('farm')
        .setDescription('Gather some veggies and gather exp!'),

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
        const hoe = playersItems['hoe'];
        const hoeTier = hoe['tier'];
        let hoeLevel = hoe['level'];
        const hoeExp = BigInt(hoe['exp']);
        const farmJob = playersJobs['farm'];
        let farmJobLevel = farmJob['level'];
        const farmJobExp = BigInt(farmJob['exp']);

        await updateBoosterInfo(interaction.user.id);

        const itemsRetrieved = getJobItems("farm", hoeTier);
        const moneyExpRetrieved = getItemMoneyAndExp("farm", itemsRetrieved, moneyBoost['amount'], expBoost['amount']);
        // We are just adding the exp to the current exp rather than updating the database to save time.
        const isToolPassLevel = checkIfToolPassLevel("hoe", hoeExp + BigInt(moneyExpRetrieved['exp']), hoeLevel);
        const isJobPassLevel = checkIfJobPassLevel(farmJobLevel, farmJobExp + BigInt(moneyExpRetrieved['exp']));
        const actionTitle = "Farm - You farmed up..."
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
          actionDesc += `\n**Your farm job has leveled up!** \n${farmJobLevel} -> **${farmJobLevel + 1}**`
          farmJobLevel += 1;
        }
        
        if (isToolPassLevel) {
          actionDesc += `\n**Your hoe has leveled up!** \n ${hoeLevel} -> **${hoeLevel + 1}**`
          hoeLevel += 1;
        }

        const actionEmbed = actionJobEmbedBuilder(color.farm, actionTitle, actionDesc);
        const newToolExp = hoeExp + BigInt(moneyExpRetrieved['exp']);
        const newJobExp = farmJobExp + BigInt(moneyExpRetrieved['exp']); 
        const newMoney = playersMoney + BigInt(moneyExpRetrieved['money']);
        
        playersItems['hoe'] = {
          "tier": hoeTier,
          "level": hoeLevel,
          "exp": String(newToolExp)
        } 
        playersJobs['farm'] = {
          "level": farmJobLevel,
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