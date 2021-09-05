const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "uptime", 
  alias: ["tiempo-bot"],
  category: "Información",
  usage: "Despliega un menú de ayuda para cada usuario.",

async execute (client, message, args){

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

    let dias = Math.floor(client.uptime / 86400000);
    let horas = Math.floor(client.uptime / 3600000) %24;
    let minutos = Math.floor(client.uptime / 1000) %60;
    let segundos = Math.floor(client.uptime / 1000) %60;

    const uptime = new Discord.MessageEmbed()

    .setAuthor("Police Star", "https://cdn.discordapp.com/attachments/848744297192751104/854834953434038302/b89c8fb332d74e787470e896fe1c73ee.png")
    .setTitle("Tiempo en línea")
    .setDescription(`<:reloj:880425813424615465> \`${dias} Días\` \`${horas} horas\` \`${minutos} minutos\` \`${segundos} segundos\``)
    .setTimestamp()
    .setFooter(`Solicitado por: ${message.author.username}`)
    .setColor("GREEN")

    message.channel.send({ embeds: [uptime] })

 }

} 