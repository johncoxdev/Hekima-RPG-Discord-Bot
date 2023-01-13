const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color } = require('../../game-assets/gameconfig.js');
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
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const playerBalance = foundPlayer.money;
        const moneyEmbed = new EmbedBuilder()
        .setTitle(`${interaction.user.username}'s Balance`)
        .setFooter({ text: `$${Number(playerBalance).toLocaleString()}`})
        .setColor(color.other);

        return interaction.reply({ embeds: [moneyEmbed] });
5
    }
}