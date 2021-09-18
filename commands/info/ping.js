const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js'); 
const { SlashCommandBuilder } = require('@discordjs/builders');

const cooldown = new Set();

module.exports = {
  name: "ping", 
  alias: ["ms"], 
  category: "Utilidad",
  usage: "Muestra el ping en MS del bot.",

  /**
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   * @param {Discord.Interaction} interaction 
   */

async execute (client, message, args, interaction) {

  if(cooldown.has(message.author.id)){
    message.channel.send({
      embeds: [{
        description: "<a:negativo:877943769083822111>┊**¡Cálmate!** espera 3s para volver a usar este **comando.**",
        color: "RED"
      }]
    })

     return;
     
  }

    cooldown.add(message.author.id);

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 3000);

    let messageping = new Date() - message.createdAt

    const botping = new MessageEmbed()
    .setAuthor("Police Star", client.user.displayAvatarURL({ format: "png" }))
    .setDescription(`<:bot:867179899655421952>┊**Bot ping:** ${client.ws.ping}\n\n<:calidad_buena:883383584075968552>┊**API Ping:** ${messageping}`)
    .setColor("GREEN")
    .setTimestamp()

    message.channel.send({
      embeds: [{
        description: "<:reloj:880835883182485534>┊Recolectando información...",
        color: "#f1ff9f"
      }]
    }).then(msg => {
      setTimeout(() => {
        msg.edit({ embeds: [botping] })
      }, 3000);
    })
     
}

} 