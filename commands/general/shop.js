const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, shopFlatAmount } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
/**
 * A shop command that will show all the 
 * items a player is able to buy.
 */

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('View the shop to purchase upgraded Armor/Tool/Weapon Teirs'),

    async execute(interaction) {  
      const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
      const playerItems = foundPlayer.items;
      let shopText = "\u200B";
      let itemID = 1;
      for (const item of Object.keys(playerItems)) {
        const fixedItemName = String(item)[0].toUpperCase() + String(item).substring(1).replace("_", " ");
        const calculatedPrice = (shopFlatAmount * playerItems[item].tier) + ((playerItems[item].tier - 1) * .85);
        shopText += `\`ID: ${itemID}\` **| ${fixedItemName} |** $${calculatedPrice.toLocaleString()}\n`
      }
      const shopField = {
        name: '**Shop**',
        value: shopText
      }
      const moneyEmbed = new EmbedBuilder()
      .setFields(shopField)
      .setFooter({ text: "Purchase items using \n/buy_item <ID>" })
      .setColor(color.other);

      return interaction.reply({ embeds: [moneyEmbed] });
    }
}