const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, message, invitems } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const { removeInventoryItem } = require('../../game-assets/utilities.js');
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
            .setMinValue(1)
            .setMaxValue(11)),

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


        /**
         * My thoughts:
         * 
         * - I'm going to check if the user even has an item
         * - I'm going to then check if the item is a booster with the isBooster() function
         * - I'm going to then check the type of booster to access all the correct information
         * with the gameconfig.
         * 
         */

        
        //first check if they even have something to use.
        if (playerInventory[playerChoice] <= 0) return interaction.reply({ embeds: [noItemEmbed] });

        if (isBooster(playerChoice)){

            const minMin = invitems.info[playerChoice].min;
            const maxMin = invitems.info[playerChoice].max;
            const randomMin = Math.floor(Math.random() * (maxMin-minMin+1)+maxMin);
            const currentTime = Math.floor(Date.now()/1000);
            const newTime = currentTime + (60*randomMin);

            //Then we get all the global items, but we're still going to have to check what type of booster it is.
            if(boosterType(playerChoice) == "exp"){

                const expAmount = invitems.info[playerChoice].exp_amount;

                if (expMultiplier['active']) return interaction.reply({ embeds: [boosterActiveEmbed] });

                const newExpMultiplier = {
                    "active": true,
                    "amount": expAmount,
                    "time": newTime
                };

                //Hardcoded sets users new multiplier
                playerMultis['exp_multiplier'] = newExpMultiplier;
                
                interaction.reply({ embeds: [boosterSetEmbed]}); 

            } else if (boosterType(playerChoice) = 'money') {
                //This deals with the money booster

                const moneyAmount = invitems.info[playerChoice].money_amount;

                if (moneyMultiplier['acitve']) return interaction.reply({ embeds: [boosterActiveEmbed] });

                const newMoneyMultiplier = {
                    "active": true,
                    "amount": moneyAmount,
                    "time": newTime
                };

                playerMultis['money_multiplier'] = newMoneyMultiplier; 

                interaction.reply({ embeds: [boosterSetEmbed]});  
            }
        } else {
            //If it is not a booster, we are going to be handling a ore object and we have to sell it with the 
            //possible boost that the player may have.
        }
        
        await removeInventoryItem(interaction.user.id, playerChoice)

        await PlayerDb.update({
            multipliers: playerMultis
        },{
            where: {
                discord_user_id: interaction.user.id
            }
        });
        interaction.reply({ embeds: [boosterSetEmbed]});        
    }
}

function isBooster(playerChoice){
    if (playerChoice >= 1 && playerChoice <= 8) return true;
    return false;
};
function boosterType(playerChoice){
    if (playerChoice >= 1 && playerChoice <= 6) return "exp";
    return "money";
};