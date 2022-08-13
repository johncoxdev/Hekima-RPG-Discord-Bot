const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
require('dotenv').config()

const commands = [];

const commandFolders = fs.readdirSync('./commands')

for (const subFolder of commandFolders){
	const commandFiles = fs.readdirSync(`./commands/${subFolder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles){
		const command = require(`./commands/${subFolder}/${file}`)
		if (command.enabled){
			console.log("logged", command.data.name)
  			commands.push(command.data.toJSON());		
		}
	}
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

