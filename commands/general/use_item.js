const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, message, invitems } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
/**
 * A command that will use the item that the player is wanting
 * to use from their inventory. This will reduce the item by
 * 1 within the database. This will also update the time, if
 * needed.
 * 
 * I am going to have to have to check if the player has
 * an active booster of each type (xp/money) already on.
 * If they don't then we're goingt to check if the player
 * has one in their inventory, and update their inventory
 * if they do. We're then going to update their profile
 * with the time the multiplier should end, type, and amount.
 * Players can also use their ore, which will give them money
 * and exp.
*/

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('use_item')
        .setDescription('Use an item from your /inventory')
        .addIntegerOption(opt => opt
            .setName("id_number")
            .setDescription("Id number for the item you want to use")
            .setRequired(true)
            .setMaxValue(11)
            .setMinValue(1)),

    async execute(interaction) {
        //use_item command

        const playerChoice = await interaction.options.getInteger('id_number');
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const playerInventory = foundPlayer.inventory;
        const playerMultis = foundPlayer.multipliers;
        let expMultiplier = playerMultis['exp_multiplier'];
        let moneyMultiplier = playerMultis['money_multiplier'];
        let currentTime = Math.floor(Date.now()/1000);
        const noItemEmbed = new EmbedBuilder()
            .setTitle("You don't have any of this item to use!")
            .setColor(color.failed);
        const boosterActiveEmbed = new EmbedBuilder()
            .setTitle("Active Booster!")
            .setColor(color.failed)
            .setDescription(message.multiplier_active);
        const boosterSetEmbed = new EmbedBuilder()
            .setTitle("Booster Activated!") 
            .setColor(color.success)

        //first check if they even have something to use.
        if (playerInventory[playerChoice] <= 0) return interaction.reply({ embeds: [noItemEmbed] });

        //I'm going to check three cases, EXP, Money, & Item
        if (playerChoice >= 1 && playerChoice <= 6 ){
            //Case: Exp Multiplier
            const minMin = invitems.info[playerChoice].min;
            const maxMin = invitems.info[playerChoice].max;
            const expAmount = invitems.info[playerChoice].exp_amount;
            const randomMin = Math.floor(Math.random() * (maxMin-minMin+1)+maxMin);
            const currentTime = Math.floor(Date.now()/1000);
            const newTime = currentTime + (60*randomMin);

            if (expMultiplier['active']) {
                return interaction.reply({ embeds: [boosterActiveEmbed] });
            }   
            const newExpMultiplier = {
                "active": true,
                "amount": expAmount,
                "time": newTime
            }

            playerInventory[playerChoice] -= 1;
            playerMultis['exp_multiplier'] = newExpMultiplier
            
            await PlayerDb.update({
                inventory: playerInventory,
                multipliers: playerMultis
            },{
                where: {
                    discord_user_id: interaction.user.id
                }
            });
            interaction.reply({ embeds: [boosterSetEmbed]});

        }else if (playerChoice >= 7 && playerChoice <= 8){
            //Case: Money Multiplier
        }else{
            //Case: Ore Use
            /** TODO: Do this case once you have /mining, farming, etc set up. 
             * We're going to have to take into account of multipliers for this too.
             */
        }
    }
}