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
    if(!tiempo){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊Debes agregar un **tiempo** (ms).",
                color: "RED"
            }]
        })
    }

    let time = ms(tiempo)

    let canal = message.mentions.channels.first() || message.channel;
    let mensaje = args.slice(1).join(' ')
    if(!mensaje){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊Debes escribir un mensaje a **recordar.**",
                color: "RED"
            }]
        })
    }

    message.channel.send({
        embeds: [{
            description: "<a:afirmativo:877943896947191819>┊Tu recordatorio a sido guardado **exitosamente.**",
            color: "GREEN"
        }]
    })

    const embed = new MessageEmbed()
    .setTimestamp()
    .setDescription(`**Recordatorio entrante:** ${mensaje}`)
    .setColor("#d3ecff")
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png" }))
    .setFooter(`Recordatorio creado por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

    setInterval(() => {
        canal.send({
            embeds: [embed]
        })
    }, time)

 }

} 
