const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "encuesta", 
  alias: ["poll"],
  category: "Información",
  usage: "Despliega un menú de ayuda para cada usuario.",

async execute (client, message, args){

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

    message.delete()

    const permsrol = message.member.roles.cache.has('806239706785775677') || message.member.roles.cache.has('806239705703120937') || message.member.roles.cache.has('878044578127679498') || message.member.roles.cache.has('878044578127679498')
    if(!permsrol){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊No tienes permiso de usar este **comando.**",
                color: "RED"
            }]
        })
    }

    const canal = message.mentions.channels.first() || client.channels.resolve(args[0])
    if(!canal){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊Debes mencionar un **canal.**",
                color: "RED"
            }]
        })
    }

    const encuesta = args.slice(1).join(' ')
    if(!encuesta){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊Debes colocar una **encuesta.**",
                color: "RED"
            }]
        })
    }

    const poll = new MessageEmbed()

    .setAuthor("Police Star | Team Star", `${client.user.displayAvatarURL({ dynamic: true })}`)
    .setColor("AQUA")
    .setDescription(`${encuesta}`)
    .setThumbnail(message.guild.iconURL())

    let msg = await canal.send({ embeds: [poll] })

    await message.channel.send({
        embeds: [{
            description: "<a:afirmativo:877943896947191819>┊Encuesta enviada **correctamente.**",
            color: "GREEN"
        }]
    })

    msg.react('<a:afirmativo:877943896947191819>')
    msg.react('<a:negativo:877943769083822111>')

 }

} 

