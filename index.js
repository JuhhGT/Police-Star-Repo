const Discord = require('discord.js');
const client = new Discord.Client({ ws: { properties: { $browser: 'Discord Android' } }, intents: 32767 });
const config = require('./config.json')
const fs = require('fs');
const { readdirSync } = require('fs');
const { FILE } = require('dns');
const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);
//////////////////Snipes//////////////////////////
client.snipes = new Map()
////////////////////Handler-1//////////////////////////////
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); 

const moderationFiles = fs.readdirSync('./commands/moderation').filter(file => file.endsWith('.js'));

const utilityFiles = fs.readdirSync('./commands/utility').filter(file => file.endsWith('.js'));

const infoFiles = fs.readdirSync('./commands/info').filter(file => file.endsWith('.js'));

const adminFiles = fs.readdirSync('./commands/admin').filter(file => file.endsWith('.js'));

const suggestFiles = fs.readdirSync('./commands/admin/suggestions').filter(file => file.endsWith('.js'));

const privateFiles = fs.readdirSync('./commands/private').filter(file => file.endsWith('.js'));
//////////////////////SlashCommands-1///////////////////////////////////////
client.slashcommand = new Discord.Collection();
const slashFiles = fs.readdirSync('./slashcmd').filter(file => file.endsWith('.js'));
////////////////////////Handler-2/////////////////////////////
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

for (const file of moderationFiles) {
    const command = require(`./commands/moderation/${file}`);
    client.commands.set(command.name, command);
}

for (const file of utilityFiles) {
    const command = require(`./commands/utility/${file}`);
    client.commands.set(command.name, command);
}

for (const file of infoFiles) {
    const command = require(`./commands/info/${file}`);
    client.commands.set(command.name, command);
}

for (const file of adminFiles) {
    const command = require(`./commands/admin/${file}`);
    client.commands.set(command.name, command);
}

for (const file of suggestFiles) {
    const command = require(`./commands/admin/suggestions/${file}`);
    client.commands.set(command.name, command);
}

for (const file of privateFiles) {
    const command = require(`./commands/private/${file}`);
    client.commands.set(command.name, command);
}
/////////////////////SlashCommands-2/////////////////////////////////////
for (const cfs of slashFiles){
    const command = require(`./slashcmd/${cfs}`)
    console.log(`-> ¡${cfs} Cargado completamente!`)
    client.slashcommand.set(command.data.name, command)
}
//////////////////////Handler-Eventos////////////////////////////////////
for (const file of fs.readdirSync('./events/')) {

    if(file.endsWith(".js")){

    let fileName = file.substring(0, file.length - 3); 

    let fileContents = require(`./events/${file}`);  

    client.on(fileName, fileContents.bind(null, client));  

    }
  }
/////////////////////////Token/////////////////////////////////////////
client.login(config.token);