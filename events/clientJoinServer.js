const { EmbedBuilder } = require("discord.js");
const { color } = require('../gameconfig.js');
const { addMember } = require('../databases/playerdb.js');

/**
 * Initiated when the client joins a server, it will
 * add all members from the server it has joined into
 * the database. Ignoring all duplicates & bots.
 */
module.exports = {
	name: 'guildCreate',
	once: false,
	async execute(guild) {

        // Get the owner & send them a message
        const serverOwner = await guild.fetchOwner();

        const serverOwnerEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hekima RPG" })
        .setColor(color.success)
        .setFooter({ text: "Thank you for inviting Hekima RPG to your server! Make sure to use /settings to add some additional features (optional) for your server!" });
             
        serverOwner.send({ embeds: [serverOwnerEmbed] });


        /**
         * addMember() is from playerdb.js and will check for
         * the user in the database, if there is already an 
         * instance of a user in the database, it will continue.
         */
         const fetchedUsers = await interaction.guild.members.fetch();

         for (const mem of fetchedUsers){
             if (mem[1].user.bot) continue;
             await addMember(mem[1].user.id)   
         } 
	},
};