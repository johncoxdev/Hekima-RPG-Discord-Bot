const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { messsage, color } = require('../../gameconfig.js');
const { addMember, PlayerDb } = require('../../databases/playerdb.js');
const fs = require('fs')
/**
 * Developer command that is used for testing.
 */

module.exports = {
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command'),

    async execute(interaction) {

        if (interaction.user.id !== "957825927109279775") return interaction.reply("You cant do this command!"); 

        // Load all users into db.
        const fetchedUsers = await interaction.guild.members.fetch();

        for (const mem of fetchedUsers){
            if (mem[1].user.bot) continue;
            await addMember(mem[1].user.id)   
        }      
        
    }
}