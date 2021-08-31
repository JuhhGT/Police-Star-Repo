const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "ping", 
  alias: ["ms"], 
  category: "Utilidad",
  usage: "Muestra el ping en MS del bot.",

execute (client, message, args) {

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
    .setAuthor("Team Star┊Police Star", 'https://cdn.discordapp.com/avatars/872207610747703377/5c9a8dce66ebb31e2a9bf3361dfa2c8f.png?size=1024')
    .setDescription(`<a:comprendido:808108747997970481> ┊ Ping del bot: **${client.ws.ping}.**`)
    .setColor("GREEN")
    .setTimestamp()
    .setFooter("Solicitado por:", usuarioma.displayAvatarURL({ dynamic: true }))
    message.channel.send({ embeds: [ping] })
     
}

} 