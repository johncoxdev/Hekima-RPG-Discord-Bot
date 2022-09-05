const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color } = require('../../game-assets/gameconfig');
const { getOrAddMember, ifBoostersExpired, updateBoosterInfo } = require('../../game-assets/utilities');

/**
 * Booster command that will retrieve the the users
 * possible active multiplier boosters and will show
 * they type & what time they expire (if so).
 */

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('boosters')
        .setDescription('Show the multiplier boosters you have active.'),
    
    async execute(interaction){

        foundPlayer = await getOrAddMember(interaction.user.id);
        foundPlayer = foundPlayer[0];

        await updateBoosterInfo(interaction.user.id);

        const boostersEmbed = new EmbedBuilder()
            .setTitle("Active Boosters")
            .setColor(color.other)
            .addFields({
                name: "\u200B",
                value: "\u200B"
            })

        const playerMultipliers = foundPlayer.multipliers;

        boostersEmbed.data.fields.pop()
        for (const [multiplierType, multiplierInfo] of Object.entries(playerMultipliers)){
            const multiplierActive = multiplierInfo['active'];
            let multiplierAmount = multiplierInfo['amount'];
            let multiplierTime = multiplierInfo['time'];


            if (multiplierActive === true){
                boostersEmbed.data.fields.push({
                    name: multiplierType.replace("_", " "),
                    value: `**Active:** ${multiplierActive} \n**Boost Amount:** ${multiplierAmount} \n**Boost ends in:** <t:${multiplierTime}:R>`,
                    inline: false         
                });
            }else{
                boostersEmbed.data.fields.push({
                    name: multiplierType.replace("_", " "),
                    value: 'No Booster active!',
                    inline: false        
                });
            }
        }
        interaction.reply({ embeds: [boostersEmbed] });   
    }
}