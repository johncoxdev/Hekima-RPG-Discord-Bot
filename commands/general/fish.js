const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, IconEmoji } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const { getJobItems, getItemMoneyAndExp, updateBoosterInfo, checkIfToolPassLevel, checkIfJobPassLevel, actionJobEmbedBuilder } = require('../../game-assets/utilities.js');
/**
 * Job component of gaining experience points and money
 * Specificically for fishing.
 */

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('fish')
        .setDescription('Catch the sea and gather exp!'),

    async execute(interaction) {
      /*  
        1. We are going to get a random experience and add it to the database
        2. We are then going to check if the experience passes the exp threshold for the level
        3. If the exp passes the threshold, then we're going to announce that they have leveled up the job/tool
        4. We are going to update the database if needed
        Notes: 
        - Most of these are going to be in the utilities.js because they repeat for the jobs (fish, fish, hunt, fish, fish)
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
        const fishing_rod = playersItems['fishing_rod'];
        const fishing_rodTier = fishing_rod['tier'];
        let fishing_rodLevel = fishing_rod['level'];
        const fishing_rodExp = BigInt(fishing_rod['exp']);
        const fishJob = playersJobs['fish'];
        let fishJobLevel = fishJob['level'];
        const fishJobExp = BigInt(fishJob['exp']);

        await updateBoosterInfo(interaction.user.id);

        const itemsRetrieved = getJobItems("fish", fishing_rodTier);
        const moneyExpRetrieved = getItemMoneyAndExp("fish", itemsRetrieved, moneyBoost['amount'], expBoost['amount']);
        // We are just adding the exp to the current exp rather than updating the database to save time.
        const isToolPassLevel = checkIfToolPassLevel("fishing_rod", fishing_rodExp + BigInt(moneyExpRetrieved['exp']), fishing_rodLevel);
        const isJobPassLevel = checkIfJobPassLevel(fishJobLevel, fishJobExp + BigInt(moneyExpRetrieved['exp']));
        const actionTitle = "Fish - You fished up..."
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
          actionDesc += `\n**Your fish job has leveled up!** \n${fishJobLevel} -> **${fishJobLevel + 1}**`
          fishJobLevel += 1;
        }
        
        if (isToolPassLevel) {
          actionDesc += `\n**Your fishing rod has leveled up!** \n ${fishing_rodLevel} -> **${fishing_rodLevel + 1}**`
          fishing_rodLevel += 1;
        }

        const actionEmbed = actionJobEmbedBuilder(color.fish, actionTitle, actionDesc);

        const newToolExp = fishing_rodExp + BigInt(moneyExpRetrieved['exp']);
        const newJobExp = fishJobExp + BigInt(moneyExpRetrieved['exp']); 
        const newMoney = playersMoney + BigInt(moneyExpRetrieved['money']);
        
        playersItems['fishing_rod'] = {
          "tier": fishing_rodTier,
          "level": fishing_rodLevel,
          "exp": String(newToolExp)
        } 
        playersJobs['fish'] = {
          "level": fishJobLevel,
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