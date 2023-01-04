const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, event } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
/**
 * start_quest command that will initiate the user's quest
 * journey if they don't have one active.
 */

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('start_quest')
        .setDescription('Start a dangerous quest! Survive & win some rewards!')
        .addStringOption( opt => opt
          .setName("difficulty")
          .setDescription('Difficuly of the quest you want to do! Do /quest to view your survival chances!')
          .setRequired(true)
          .addChoices({
            name: "Level 1",
            value: '1'
          },{
            name: "Level 2",
            value: '2'
          },{
            name: "Level 3",
            value: '3'
          },{
            name: "Level 4",
            value: '4'
          },{
            name: "Level 5",
            value: '5'
          })),

    async execute(interaction) {
      /*
      1. Check if the user already has an active quest, If so send error message
      2. If not, update db to current quest
      */

      const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
      const playersQuest = foundPlayer.quests
      const questEmbed = new EmbedBuilder()

      if (playersQuest['active']){
        questEmbed.setTitle("Quest Denied!")
        questEmbed.setColor(color.failed)
        questEmbed.setDescription("You're already on a quest! Do `/quest` to view the remaining time you have!")
        return interaction.reply({ embeds: [questEmbed] });
      }
      const getUsersChoice = Number(await interaction.options.getString("difficulty"));
      const questTotalTime = getQuestTime(getUsersChoice);

      playersQuest['active'] = true;
      playersQuest['level'] = getUsersChoice;
      playersQuest['time'] = questTotalTime;

      await PlayerDb.update({
        quests: playersQuest
      },{
        where: {
          discord_user_id: interaction.user.id
        }
      });

      questEmbed.setTitle("Quest Started!")
      questEmbed.setDescription(`You have started a level ${getUsersChoice} difficulty quest! Good luck traveller! \nQuest ends on <t:${questTotalTime}:F>`)
      questEmbed.setColor(color.success);

      return interaction.reply({ embeds: [questEmbed] });
  }
}

function getQuestTime(difficulty){
  const currentTime = Math.floor(Date.now()/1000);
  const questTime = event.quest[difficulty]['time'];
  return currentTime + questTime;
}