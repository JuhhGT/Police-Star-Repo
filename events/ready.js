const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');

module.exports = (client) => {

     client.user.setPresence({
          activities: [{
            name: 'MD para quejas, dudas y reportes.',
            type: 'WATCHING'
          }]
        });
     
    console.log(chalk.green('Police Star ready.'))

} 