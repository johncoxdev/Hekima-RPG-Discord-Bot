const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');
const { Sequelize } = require('sequelize');
const sequelize = require ('../../databases/initdb.js');
const queryInterface = sequelize.getQueryInterface();

module.exports = {
    enabled: true,
	category: 'Staff',
	data: new SlashCommandBuilder()
		.setName('add_new_columns')
		.setDescription('Update & add new columns to db table.'),
		
	async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
            return interaction.reply({ content: 'Invalid Permissions. (`ADMINISTRATOR`)', ephemeral: true });
        }

        await queryInterface.addColumn('userdbs', "userTotalBumps", {
            type: Sequelize.INTEGER,
            defaultValue: 0
        });
        await queryInterface.addColumn('userdbs', "userCommandCooldown", {
            type: Sequelize.STRING,
            defaultValue: ""
        });

        await interaction.reply("updated completed")

	},
};