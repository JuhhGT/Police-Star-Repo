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

 if(args[2]) return;

 function idSystem(length) {
   if(!length) length = 4;
   let ids = '1029384756';
   let result = "";
   for (var i = 0; i < length; i++) {
     result += ids.charAt(Math.floor(Math.random() * ids.length));
   }
   return result
 }

 const idbaneados = idSystem(4)

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

  const mutemb = new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
  .setDescription(`<:ban:880826676211245107>┊El usuario \`${message.mentions.members.first().tag}\` ha sido muteado **correctamente.**`)
  .addField("Razón", `${razon}`)
  .addField("Moderador", `${message.author.tag}`)
  .setFooter(`ID Sanción: ${idSystem(4)}`)
  .setTimestamp()
  .setColor("#a2a2ff")
  message.channel.send({ embeds: [mutemb] }) 

  const embuser = new MessageEmbed()
  .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
  .setDescription(`<:baneado:875731740981878796> Te han muteado en el servidor ${message.guild.name}.\n\n**Tu sanción es permanente.**\n**Razón:** ${razon}`)
  .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
  .setTimestamp()
  .setColor("#c7f3ff")

  usuario.ban({ reason: razon }).catch((e) => message.channel.send({
    embeds: [{
      description: "<a:negativo:877943769083822111>┊Ha ocurrido un error **desconocido.**",
      color: "RED"
    }]
  })).then(() => message.channel.send({ embeds: [mutemb] })).then(msg => {
    setTimeout(() => {
      msg.delete()
    }, 3000);
  })

  await usuario.send({
    embeds: [embuser]
  })
 
 }

} 