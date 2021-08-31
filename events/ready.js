const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');

module.exports = (client) => {

     const array = [
          {
               name: "MD para quejas, dudas y reportes.",
               type: 'WATCHING',
          }
     ]

     setInterval(() => {
          function presence() {
               client.user.setPresence({
                    status: "online",
                    activity: [array]
               });
          }

          presence();
     }, 10000)
     
    console.log(chalk.green('Police Star ready.'))

} 