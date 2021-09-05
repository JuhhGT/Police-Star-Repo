const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const muterol = new db.crearDB("muterol");

const cooldown = new Set();

module.exports = {
  name: "mute", 
  alias: [],
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

    if (!message.guild.me.permissions.has('ADMINISTRATOR')) {
      {
        message.channel.send({
             embeds: [{
                  description: "<a:negativo:877943769083822111>┊No tengo **permisos** para usar este comando.",
                  color: "RED"
             }]
        })
        return;
   }
    
  }
   
 const permsrol = message.member.roles.cache.has('806239706785775677') || message.member.roles.cache.has('806239705703120937') || message.member.roles.cache.has('878044578127679498') || message.member.roles.cache.has('878044578127679498')
  if(!permsrol){
      message.channel.send({
           embeds: [{
                description: "<a:negativo:877943769083822111>┊No tienes **permisos** para utilizar este comando.",
                color: "RED"
           }]
      })
      return;
 }

  let mencionado = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!mencionado){
      message.channel.send({
           embeds: [{
                description: "<a:negativo:877943769083822111>┊Debes de **mencionar** a alguien.",
                color: "RED"
           }]
      })
      return;
  }

  var razon = args[1]
  if(!razon){
    razon = 'No especificada.'
  }

  if(!muterol.tiene(message.guild.id)){
    message.channel.send({
           embeds: [{
                description: "<a:negativo:877943769083822111>┊No hay ningún **rol** de mute seleccionado.",
                color: "RED"
           }]
      })
      return;
 
  }

  let rol = await muterol.obtener(message.guild.id)

  if(mencionado.roles.cache.has(rol)){
      message.channel.send({
           embeds: [{
                description: "<a:negativo:877943769083822111>┊El usuario ya esta **muteado.**",
                color: "RED"
           }]
      })
      return;
 
  }

  mencionado.roles.add(rol)

  const kickemb = new Discord.MessageEmbed();
    new MessageEmbed()
    .setAuthor("Sanción", `${message.author.displayAvatarURL({ dynamic: true })}`)
    .addField("Tipo:", `Muted`)
    .addField("Infractor", `${mencionado.user.tag}`)
    .addField("Razón:", `${razon}`)
    .addField("Moderador:", `${message.author.tag}`)
    .setColor("RED")
    .setTimestamp()

    message.channel.send({ embeds: [mutemb] }) 
 
 }

} 