const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, IconEmoji } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const { getJobItems, getItemMoneyAndExp, updateBoosterInfo, checkIfToolPassLevel, checkIfJobPassLevel, actionJobEmbedBuilder } = require('../../game-assets/utilities.js');
/**
 * Job component of gaining experience points and money
 * Specificically for mining.
 */

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('mine')
        .setDescription('Mine and gather exp!'),

    async execute(interaction) {
      /*  
        1. We are going to get a random experience and add it to the database
        2. We are then going to check if the experience passes the exp threshold for the level
        3. If the exp passes the threshold, then we're going to announce that they have leveled up the job/tool
        4. We are going to update the database if needed
        Notes: 
        - Most of these are going to be in the utilities.js because they repeat for the jobs (mine, farm, hunt, fish, lumber)
        - Tools need to level to 100 (then they can upgrade the tool)
        - Job levels go infinetely 
      */
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const playersJobs = foundPlayer.jobs;
        const playersItems = foundPlayer.items;
        const playersMoney = BigInt(foundPlayer.money);
        const playersMultipliers = foundPlayer.multipliers
        const moneyBoost = (playersMultipliers['exp_multiplier'])
        const expBoost = (playersMultipliers['money_multiplier'])
        const pickaxe = playersItems['pickaxe'];
        const pickaxeTier = pickaxe['tier'];
        let pickaxeLevel = pickaxe['level'];
        const pickaxeExp = BigInt(pickaxe['exp']);
        const mineJob = playersJobs['mine'];
        let mineJobLevel = mineJob['level'];
        const mineJobExp = BigInt(mineJob['exp']);

        await updateBoosterInfo(interaction.user.id);

        const itemsRetrieved = getJobItems("mine", pickaxeTier);
        const moneyExpRetrieved = getItemMoneyAndExp("mine", itemsRetrieved, moneyBoost['amount'], expBoost['amount']);
        // We are just adding the exp to the current exp rather than updating the database to save time.
        const isToolPassLevel = checkIfToolPassLevel("pickaxe", pickaxeExp +BigInt(moneyExpRetrieved['exp']), pickaxeLevel);
        const isJobPassLevel = checkIfJobPassLevel(mineJobLevel, mineJobExp + BigInt(moneyExpRetrieved['exp']));
        const actionTitle = "Mining - You mined up..."
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
          actionDesc += `\n**Your Mine job has leveled up!** \n${mineJobLevel} -> **${mineJobLevel + 1}**`
          mineJobLevel += 1
        }
        
        if (isToolPassLevel) {
          actionDesc += `\n**Your tool has leveled up!** \n ${pickaxeLevel} -> **${pickaxeLevel + 1}**`
          pickaxeLevel += 1
        }

        const actionEmbed = actionJobEmbedBuilder(color.mine, actionTitle, actionDesc);

        const newToolExp = pickaxeExp + BigInt(moneyExpRetrieved['exp']);
        const newJobExp = mineJobExp + BigInt(moneyExpRetrieved['exp']); 
        const newMoney = playersMoney + BigInt(moneyExpRetrieved['money']);

        playersItems['pickaxe'] = {
          "tier": pickaxeTier,
          "level": pickaxeLevel,
          "exp": String(newToolExp)
        } 
        playersJobs['mine'] = {
          "level": mineJobLevel,
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