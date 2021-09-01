const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const megadb = require('megadb');
const configwlc = new megadb.crearDB("Bienvenidas");

const cooldown = new Set();

module.exports = {
  name: "setwelcome", 
  alias: ["canal-wlc"],
  category: "Administracion",
  usage: "Establece un canal de bienvenidas.",

  /**
   * @param {Discord.Client} client 
   * @param {Discord.Message}} message 
   * @param {string[]} args 
   */

async execute (client, message, args){

    message.delete()

    const cooldownem = new Discord.MessageEmbed()
    .setDescription("<a:negativo:877943769083822111>┊**¡Calmate!** espera 3s para volver a usar este **comando.**")
    .setColor("RED")
    
    if(cooldown.has(message.author.id)){
        message.channel.send({ embeds: [cooldownem] })

       return;
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 3000);

    var permisos = message.member.permissions.has("ADMINISTRATOR")
    if(!permisos){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊No tienes permiso de usar este **comando.**",
                color: "RED"
            }]
        })
    }

    let canal = message.mentions.channels.first()
    if(!canal){
        return message.channel.send({
            embeds: [{
                description: "<a:afirmativo:877943896947191819>┊Selecciona la **ID** del canal que deseas establecer.",
                color: "RED"
            }]
        })
    }

    configwlc.set(`Co-${message.guild.id}`, canal.id)

    await message.channel.send({
        embeds: [{
            description: `<a:afirmativo:877943896947191819>┊El canal para las bienvenidas a sido establecido exitosamente a ${canal}.`,
            color: "GREEN"
        }]
    })

 }

} 

