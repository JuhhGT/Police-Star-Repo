const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');

module.exports = (client) => {

     client.user.setPresence({
          status: 'dnd',
          activities: [{
            name: 'Mantenimiento',
            type: 'WATCHING'
          }]
        });
     
    console.log(chalk.green('Police Star ready.'))

} 