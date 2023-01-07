const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const { getJobItems, getItemMoneyAndExp, checkIfBoostIsExpired, updateBoosterInfo, checkIfToolPassLevel } = require('../../game-assets/utilities.js');
/**
 * Job component of gaining experience points and money
 * Specificically for mining. This file will be different
 * compared to the other jobs because the mining job has a different
 * config outline. So everything mining will be done through here.
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
        const playersMultipliers = foundPlayer.multipliers
        const moneyBoost = (playersMultipliers['exp_multiplier'])
        const expBoost = (playersMultipliers['money_multiplier'])
        const pickaxe = playersItems['pickaxe'];
        // const pickaxeTier = pickaxe['tier'];
        // const pickaxeExp = pickaxe['exp'];
        // const pickaxeLevel = pickaxe['level'];

        await updateBoosterInfo(interaction.user.id);
        const itemsRetrieved = getJobItems("mine", pickaxe['tier']);
        const moneyExpRetrieved = getItemMoneyAndExp("mine", itemsRetrieved, moneyBoost['amount'], expBoost['amount']);
        //update tool exp/money in database
        const isToolPassLevel = checkIfToolPassLevel("pickaxe", pickaxe['exp'], pickaxe['level']);
        // checkIfJobPassLevel()
        // formatJob
        /* formatEventEmbed(
          - Should have option to add if Tool/Job leveled up
        )
        */
        interaction.reply("mined!")
    }
}