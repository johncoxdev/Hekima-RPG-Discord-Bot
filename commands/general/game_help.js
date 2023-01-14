const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color } = require('../../game-assets/gameconfig.js');
const fs = require('fs');
/**
 * game_help will show all the avaliable commands within the bot, 
 * it will also show a custom message from me explaining the game
 * and how it works.
 */

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('game_help')
        .setDescription('View how the game works, and all the commands!'),

    async execute(interaction) {
      const commandFolders = fs.readdirSync('./commands');
      const fieldList = [];

      const commandEmbed = new EmbedBuilder()
      .setColor(color.other)
      .setTitle("Game Help")
      .setDescription("**Welcome to Hekima RPG!** \nHekima RPG is a command-IDLE based game. There is no goal to the game besides prestiging and ranking up your job level to the highest you can get it to! Here is some info on getting started! To upgrade your gear to the next tier, you must first rank up to level to 100, and then purchase your upgrade in the shop. For quest, increasing your survival chances will happen when you upgrade your armor to the next tier! You can get chest which offer rewards from daily & weekly commands (if enabled) and surviving quests. There is exp and money boosters which you can get from chest only! Have fun!");

      for (const subFolder of commandFolders){
        let fieldName = "\u200B";
        let fieldValue = "\u200B";
        const commandFiles = fs.readdirSync(`./commands/${subFolder}`).filter(file => file.endsWith('.js'));

        fieldName = subFolder;

        for (const file of commandFiles){
          const command = require(`../../commands/${subFolder}/${file}`)
          fieldValue += `/${command.data.name} - ${command.data.description}\n`
        }
        const newField = {
          name: fieldName,
          value: fieldValue,
          inline: false
        }
        fieldList.push(newField)
      }
      commandEmbed.setFields(fieldList);

      return interaction.reply({ embeds: [commandEmbed] });
    }
}