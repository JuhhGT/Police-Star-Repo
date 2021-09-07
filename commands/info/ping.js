const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js'); 
const { SlashCommandBuilder } = require('@discordjs/builders');

const cooldown = new Set();

module.exports = {
  name: "ping", 
  alias: ["ms"], 
  category: "Utilidad",
  usage: "Muestra el ping en MS del bot.",

  data: new SlashCommandBuilder()
  .setName("test")
  .setDescription("Comando de slash ping"),

execute (client, message, args, interaction) {

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

    const usuarioma = message.author;

    const ping = new Discord.MessageEmbed()
    
    .setAuthor("Police Star", 'https://cdn.discordapp.com/avatars/872207610747703377/5c9a8dce66ebb31e2a9bf3361dfa2c8f.png?size=1024')
    .setDescription(`<a:comprendido:808108747997970481>┊Ping del bot: **${client.ws.ping}.**\n\n<a:comprendido:808108747997970481>┊Discord API: **${Date.now() - message.createdTimestamp}ms**`)
    .setFooter(`Pedido por: ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
    .setColor("GREEN")

    message.channel.send({ embeds: [ping] })
     
}

} 