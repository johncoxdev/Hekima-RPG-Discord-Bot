const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Colors } = require('discord.js');
const { Server } = require('../../databases/serverdb');
const { Player } = require('../../databases/playerdb');


module.exports = {
    enabled: true,
    category: 'General',
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('View your profile, or someone elses.')
        .addUserOption(opt => opt
            .setName("user")
            .setDescription("User to show")
            .setRequired(false)),

    async execute(interaction) {

        let getUserOption = interaction.options.getUser('user');
        
        if (getUserOption === null || getUserOption.bot) getUserOption = interaction.user;

        const serverExistdb = await Server.findOne({ where: { serverID: interaction.guild.id } });
	
		if (!serverExistdb) return interaction.reply({ content: "**[ERROR]:** Server not in database. Please use /setup!", ephemeral: true });

        const foundUser = await Player.findOne({ where: { userID: getUserOption.id } });
        
        if (!foundUser) return interaction.reply({ content: "**[ERROR]:** You are not in the database! Tell a staff member to add you to it!", ephemeral: true });

        const BumpPoints = foundUser.get("userTotalBumps");

        const profileEmbed = new EmbedBuilder()
            .setColor(Colors.DarkPurple)
            .setThumbnail(getUserOption.displayAvatarURL())
            .setTitle(`${getUserOption.username}'s Profile`)
            .addFields([
                {
                    name: "Bump Points:",
                    value: `${BumpPoints}`,
                    inline: false
                }
            ]);

        interaction.reply({ embeds: [profileEmbed] });
    },
};