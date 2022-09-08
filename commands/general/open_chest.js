const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color, loottable, itemInfo, crate } = require('../../game-assets/gameconfig.js');
const { PlayerDb } = require('../../databases/playerdb.js');
/**
 * This command will allow the user to open a chest, if they
 * have one and get a random reward from a tier that is selected.
 * The way the chest system works is by first checking if a user has
 * a chest in their profile, and if so we will use one, give them a 
 * reward, and update the chest count and inventory status of the user.
 * 
 * Chest rewards are based on two systems. One being that a chest gets
 * a random tier of rewards based on a weight system. Once you found a
 * tier of rewards. It will then get a random ID from that list and give
 * it to the user.
 */

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('open_chest')
        .setDescription('Open a chest to get a reward!')
        .addStringOption( opt => opt
            .setName("type")
            .setDescription("Chest type to open")
            .setRequired(true)
            .addChoices({
                name: 'Common Chest',
                value: 'common'
            },
            {
                name: 'Uncommon Chest',
                value: 'uncommon'
            },
            {
                name: 'Rare Chest',
                value: 'rare'
            },
            {
                name: 'Epic Chest',
                value: 'epic'
            },
            {
                name: 'Mythical Chest',
                value: 'mythical'
            })),

    async execute(interaction) {

        //Get the choice and see if a user has a chest of that kind
        const chosenChoice = await interaction.options.getString('type')
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: interaction.user.id } });
        const playersChests = foundPlayer.chest;
        
        if (playersChests[chosenChoice] <= 0) return interaction.reply(`You don't have any ${chosenChoice} chest to open`);

        //We're going to get a random amount of rewards based on the game config
        playersChests[`${chosenChoice}`] -= 1 //automatically removes 1 chest from json
        const inv = foundPlayer.inventory;
        const chest = crate[chosenChoice];
        const randomAmt = Math.floor(Math.random() * chest["amount"]) + 1;
        let total_weight = 0;
        //Build EmbedMessage
        const chestEmbed = new EmbedBuilder()
            .setTitle(`You opened a ${chosenChoice} chest!`)
            .setColor(color.success)
            .setDescription("Items:\n")
            .setFooter({ text: "All items have been added to your /inventory"});

        for (let [type, amt] of Object.entries(chest['loottable'])){
            total_weight += amt
        };
        let randomNumber = Math.floor(Math.random() * total_weight)

        //get the amount of rewards needed and add them to the player's inventory.
        for (x = 0; x < randomAmt; x++){
            let itemId = get_random_tier(chest, randomNumber)
            inv[`${itemId}`] += 1
            chestEmbed.data.description += `${itemInfo['emoji'][itemId]} **+1** ${itemInfo['name'][itemId]}\n`
        }

        await PlayerDb.update({
            inventory: inv,
            chest: playersChests
        },{
            where: {
                discord_user_id: interaction.user.id
            }
        });

        return interaction.reply({ embeds: [chestEmbed] });
    }
};


function get_random_tier(chest, randomNumber){ 
    let gotId;
    for (const [type, amt] of Object.entries(chest['loottable'])){
        if (randomNumber <= amt){
            gotId = loottable[type][Math.floor(Math.random() * loottable[type].length)];
            break;
        }else{
            randomNumber -= amt;
        }
    };  
    return gotId;
};