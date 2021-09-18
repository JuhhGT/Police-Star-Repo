const { time } = require('@discordjs/builders');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

const cooldown = new Set();

module.exports = {
  name: "recordatorio",
  alias: ["recordar"],
  category: "Administración.",
  desc: "Crea un recordatorio para el servidor.",
  usage: "`<prefix>recordatorio <Canal> <Texto>`",
  userPerms: "Administrador.",
  botPerms: "Administrador.",

  /**
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   */

execute (client, message, args){

    const cooldownem = new Discord.MessageEmbed()
    .setDescription("<a:negativo:877943769083822111>┊**¡Cálmate!** espera 3s para volver a usar este **comando.**")
    .setColor("RED")
    
    if(cooldown.has(message.author.id)){
        message.channel.send({ embeds: [cooldownem] })

       return;
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 3000);

    var userpermisos = message.member.permissions.has("ADMINISTRATOR")
    if(!userpermisos){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊No tienes permiso de usar este **comando.**",
                color: "RED"
            }]
        })
    }

    var botpermisos = message.guild.me.permissions.has("ADMINISTRATOR")
    if(!botpermisos){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊No tengo permisos para usar este **comando.**",
                color: "RED"
            }]
        })
    }

    let tiempo = args[0]
    let tiempoConver = ms(tiempo)
    if(!tiempo){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊Debes ingresar un tiempo para el **recordatorio.**",
                color: "RED"
            }]
        })
    }

    const canal = args[1] || message.mentions.channels.first()
    if(!canal){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊Debes ingresar un **canal.**"
            }]
        })
    }

    let recordar = args.slice(2).join(' ')
    if(!recordar){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊Debes ingresar algo para **recordar.**",
                color: "RED"
            }]
        })
    }

    const recordatorio = new MessageEmbed().setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png" })).setDescription(`> **Recordatorio entrante:** ${recordar}`)

    message.channel.send({
        embeds: [{
            description: "<a:afirmativo:877943896947191819>┊¡Perfecto! Tu recordatorio ha sido **guardado** exitosamente.",
            timestamp: Date.now(),
            color: "GREEN"
        }]
    })
    
    message.channel.send(recordatorio2)

 }

} 
