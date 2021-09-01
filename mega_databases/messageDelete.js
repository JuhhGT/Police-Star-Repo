const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = (client, message, args) => {

    client.snipes.set(message.channel.id, {
        content: message.content,
        delete: message.author,
        canal: message.channel
      })

} 