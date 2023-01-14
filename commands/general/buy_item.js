const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { color, shopFlatAmount } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const Canvas = require('@napi-rs/canvas');
const { loadToolImage } = require('../../game-assets/utilities.js');
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
        const toolPrice = Math.floor(shopFlatAmount * playerItems[playersChoice].tier) + (shopFlatAmount  * ((playerItems[playersChoice].tier - 1) * 7.83));
        const isMaxLevel = (playerItems[playersChoice].level === 100 || playersChoice === "helmet" || playersChoice === "chestplate" || playersChoice === "boots") ? true : false;
        const isMaxTier = (playerItems[playersChoice].tier === 10) ? true : false;
        const hasEnoughMoney = (playerBalance >= BigInt(toolPrice)) ? true : false;
        const shopEmbed = new EmbedBuilder();

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

        playerItems[playersChoice]['tier'] += 1;
        playerItems[playersChoice]['level'] = 0;
        playerItems[playersChoice]['exp'] = '0';
        const newMoney = playerBalance - BigInt(toolPrice);

        await PlayerDb.update({
          items: playerItems,
          money: String(newMoney)
        },{
          where: {
            discord_user_id: interaction.user.id
          }
        });

        const canvas = Canvas.createCanvas(250, 500);
        const context = canvas.getContext('2d');
        const gradient = context.createLinearGradient(canvas.width/2, 0, canvas.width/2, canvas.height);

        gradient.addColorStop(0, "#1c1c1c");
        gradient.addColorStop(0.5, "black");
        gradient.addColorStop(1, "#1c1c1c");

        context.fillStyle = "black";
        context.font = '21 px Trebuchet MS';
        context.fillRect(0, 0, canvas.width, canvas.height);

        const itemImage = await Canvas.loadImage(loadToolImage(playersChoice, playerItems[playersChoice].tier));

        const x_pos = (canvas.width - itemImage.width*2) * 0.5
        const y_pos = (canvas.height - itemImage.height*2) * 0.5

        context.shadowBlur = 30;
        context.shadowColor = "orange";
        context.drawImage(itemImage, x_pos, y_pos, itemImage.width*2, itemImage.height*2);

        context.shadowColor = "#44ff2b";
        context.fillStyle = "white";
        context.fillText("ITEM UPGRADED!", canvas.width/6, canvas.height/4)
        context.fillText(`Tier ${playerItems[playersChoice].tier}`, canvas.width/2.75, canvas.height/1.25)

        const upgradeImage = new AttachmentBuilder(await canvas.encode('png'), { name: 'upgrade-image.png' });

        const upgradeEmbed = new EmbedBuilder()
          .setColor(color.success)
          .setTitle(`${playersChoice} upgraded!`)
          .setFooter({ text:`You upgraded your ${playersChoice} to tier ${playerItems[playersChoice].tier}` })
          .setImage(`attachment://${upgradeImage.name}`);

        return interaction.reply({ embeds: [upgradeEmbed], files: [upgradeImage] });
    }
}