const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder, Message } = require('discord.js');
const { color, upgrade, level_exp } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
const Canvas = require('@napi-rs/canvas');
/**
 * Stats command that will show the players level for weapon/tool/armor
 */

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('View your tools/armor & jobs.')
        .addStringOption(opt => opt
            .setName("options")
            .setDescription("Choice between tools/armor or jobs")
            .setRequired(true)
            .setChoices({
                name: "tools_and_armor",
                value: "tools"
            },
            {
                name: "jobs",
                value: "jobs"
            })),

    async execute(interaction) {
        const chosenChoice = await interaction.options.getString("options");
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const statsEmbed = new EmbedBuilder();
        let itemList = [];


        //tools embed (/stats tools_and_armor)
        if (chosenChoice == "tools"){
          const canvas = Canvas.createCanvas(1000, 170);
          const context = canvas.getContext('2d');
          context.font = '21 px sans-serif';
          context.fillStyle = `black`;
          context.fillRect(0, 0, canvas.width, canvas.height);

          const playersItems = foundPlayer.items
          statsEmbed.setTitle(`${interaction.user.username} Item's Stats`)
          let index = 0;

          for ( item in playersItems ) {
            const expNeeded = Math.floor((playersItems[item].level/upgrade[item].exp.x_exp_per_level)**upgrade[item].exp.y_gap_per_level);

            const itemDesc = (item == "helmet" || item == "chestplate" || item == "boots" ) ? `**Tier:** ${playersItems[item].tier}` : `**Tier:** ${playersItems[item].tier} **Level:** ${playersItems[item].level} \n**Experience:** ${Number(playersItems[item].exp).toLocaleString()}/${(expNeeded).toLocaleString()}`
            
            const itemLevel = (item == "helmet" || item == "chestplate" || item == "boots") ? " " : `Level:  ${playersItems[item].level}`

            const itemImage = await Canvas.loadImage(loadToolImage(item, playersItems[item].tier));
            // I am hardcoding "9" as the placement since we have 9 objects we are checking for. Normally I would get the length of the Object.
            const x_pos = index * (canvas.width/9);   

            context.drawImage(itemImage, x_pos, 0, itemImage.width*1.25, itemImage.height*1.25)
            context.shadowColor = "black";
            context.fillStyle = "white";
            context.fillText(`Tier:  ${playersItems[item].tier}`, x_pos, 150)
            context.fillText(itemLevel, x_pos, 170)
            
            index++
            currItem = {
                name: `${String(item)[0].toUpperCase() + String(item).substring(1).replace("_", " ")}`,
                value: itemDesc,
                inline: true
            }
            itemList.push(currItem)          
          }

          statsEmbed.setFields(itemList)
          statsEmbed.setColor(color.other);
          const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'stats-image.png' });
          statsEmbed.setImage(`attachment://${attachment.name}`)
          return interaction.reply({ embeds: [statsEmbed] , files: [attachment] });
        
        // Jobs Embed (/stats jobs)
        } else if ( chosenChoice == "jobs") {
          const playersJobs = foundPlayer.jobs;
          const playerPrestige = foundPlayer.prestige;
          statsEmbed.addFields({name: '**Prestige:** ', value: `${playerPrestige}`});

          // loop through player's jobs and add them to stats.
          for ( job in playersJobs ) {
            const expNeeded = Math.floor((playersJobs[job].level/level_exp.x_exp_per_level)**level_exp.y_gap_per_level);
            const jobDesc = `**Level:** ${playersJobs[job].level} \n**Experience:** ${Number(playersJobs[job].exp).toLocaleString()}/${Number(expNeeded).toLocaleString()}`

            currItem = {
              name: `${job}`,
              value: jobDesc,
              inline: true
            }
            itemList.push(currItem) 
          }
          statsEmbed.setFields(itemList)
          statsEmbed.setColor(color.other);
          return interaction.reply({ embeds: [statsEmbed] });
        }
    }
}

function loadToolImage(tool, tier) {
  const loadedImages = {
    "helmet": `./game-assets/game-images/armor/tier ${tier}/1.png`,
    "chestplate": `./game-assets/game-images/armor/tier ${tier}/2.png`,
    "boots": `./game-assets/game-images/armor/tier ${tier}/3.png`,
    "axe": `./game-assets/game-images/tool/axe/${tier}.png`,    
    "fishing_rod": `./game-assets/game-images/tool/fishing rod/${tier}.png`,
    "hoe": `./game-assets/game-images/tool/hoe/${tier}.png`,
    "pickaxe": `./game-assets/game-images/tool/pickaxe/${tier}.png`,
    "sword": `./game-assets/game-images/weapon/sword/${tier}.png`,
    "bow": `./game-assets/game-images/weapon/bow/${tier}.png`
  };
  return loadedImages[tool];
}