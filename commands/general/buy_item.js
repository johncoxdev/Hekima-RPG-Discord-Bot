const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, shopFlatAmount } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
/**
 * A command that will upgrade the user's tier if they have the requirement
 */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buy_item')
        .setDescription('Buy an item from /shop')
        .addStringOption( opt => opt
          .setName("item_id")
          .setDescription("Item ID you're going to buy.")
          .setRequired(true)
          .addChoices({
           name: "1", 
           value: "sword"
          },{
           name: "2", 
           value: "bow"
          },{
           name: "3", 
           value: "pickaxe"
          },{
           name: "4", 
           value: "axe"
          },{
           name: "5", 
           value: "fishing_rod"
          },{
           name: "6", 
           value: "hoe"
          },{
           name: "7", 
           value: "helmet"
          },{
           name: "8", 
           value: "chestplate"
          },{
           name: "9", 
           value: "boots"
          })),

    async execute(interaction) {
      /**
       * I'm going to need to handle all cases of which buying the 
       * item can fail. Tier, Level, and Money should be all the cases
       * I will also need to update the user's item database with the
       * proper item, tier, and resetting the level to 0 if need be.
       * I'm also going to be sending a canvas an upgraded from the prev
       * item to their new item!
       */
        const playersChoice = await interaction.options.getString('item_id');
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const playerBalance = BigInt(foundPlayer.money);
        const playerItems = foundPlayer.items;
        const toolPrice = (shopFlatAmount * playerItems[playersChoice].tier) + ((playerItems[playersChoice].tier - 1) * .85)

        const isMaxLevel = (playerItems[playersChoice].level === 100) ? true : false;
        const isMaxTier = (playerItems[playersChoice].tier === 10) ? true : false;
        const hasEnoughMoney = (playerBalance >= toolPrice) ? true : false;
        const shopEmbed = new EmbedBuilder()

        if (!isMaxLevel) {
          shopEmbed.setTitle("Your tool must be level 100 in order to purchase the next tier!")
          shopEmbed.setColor(color.failed);
          return interaction.reply({ embeds: [shopEmbed] });
        }

        if (isMaxTier) {
          shopEmbed.setTitle("Your tool is already max tiered! Cannot upgrade!")
          shopEmbed.setColor(color.failed);
          return interaction.reply({ embeds: [shopEmbed] });
        }

        if (!hasEnoughMoney) {
          shopEmbed.setTitle("You dont have enough money!")
          shopEmbed.setColor(color.failed);
          return interaction.reply({ embeds: [shopEmbed] });
        }

        

        return interaction.reply({ embeds: [shopEmbed] });
    }
}