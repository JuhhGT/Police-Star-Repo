const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const cooldown = new Set()

module.exports = {
  name: "ban", 
  alias: ["banear"],
  category: "Moderación",
  desc: "Banea a un usuario dentro o fuera del servidor.",
  usage: "`<prefix>ban <usuario> [razón]`",
  userPerms: "Banear miembros.",
  botPerms: "Banear miembros",
  /**
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   */

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

    const permsbot = message.guild.me.permissions.has("BAN_MEMBERS")
    if(!permsbot){
      return message.channel.send({
        embeds: [{
          description: "<a:negativo:877943769083822111>┊No tienes permiso de usar este **comando.**",
          color: "RED"
        }]
      })
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

    let usuario = message.mentions.members.first() || await client.users.fetch(args[0]) || message.guild.members.cache.get(args[0])
    if(!usuario){
        return message.channel.send({
            embeds: [{
              description: "<a:negativo:877943769083822111>┊Debes mencionar a un **usuario.**",
              color: "RED"
            }]
          })           
        }

    if(!usuario.bannable){
      return message.channel.send({
        embeds: [{
          description: "<a:negativo:877943769083822111>┊No fue posible **banear** a esta persona."
        }]
      })
    }    

    if(usuario.id === message.author.id){
      return message.channel.send({
        embeds: [{
          description: "<a:negativo:877943769083822111>┊No puedes **banearte** a ti mismo.",
          color: "RED"
        }]
      })
    }
    
    if(usuario.id === client.user.id){
      return message.channel.send({
        embeds: [{
          description: "<a:negativo:877943769083822111>┊No puedo **banearme** a mi mismo.",
          color: "RED"
        }]
      })
    }

    if(usuario.roles.highest.comparePositionTo(message.member.roles.highest) > 0){
      return message.channel.send({
        embeds: [{
          description: "<a:negativo:877943769083822111>┊No puedes **banear** a alguien de mayor o igual poder que tu.",
          color: "RED"
        }]
      })
    }
    
    var razon = args.slice(1).join(' ')
    if(!razon){
        razon = 'No especificada.'
    }

    const banembed = new MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`<:ban:880826676211245107>┊El usuario \`${message.mentions.members.first().tag}\` ha sido baneado **correctamente.**`)
    .addField("Razón", `${razon}`)
    .addField("Moderador", `${message.author.tag}`)
    .setFooter(`ID Sanción: ${idSystem(4)}`)
    .setTimestamp()
    .setColor("#a2a2ff")

    const embeduser = new MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`<:baneado:875731740981878796> Te han baneado del servidor ${message.guild.name}.\n\n**Tu sanción es permanente.**\n**Razón:** ${razon}`)
    .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .setColor("#c7f3ff")

    if(message.author.bot) return message.channel.send({
      embeds: [{
        description: "<a:negativo:877943769083822111>┊No se ha podido enviar el MD al usuario",
        color: "RED"
      }]
    })

    usuario.ban({ reason: razon }).catch((e) => message.channel.send({
      embeds: [{
        description: "<a:negativo:877943769083822111>┊Ha ocurrido un error **desconocido.**",
        color: "RED"
      }]
    })).then(() => message.channel.send({ embeds: [banembed] })).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, 3000);
    })

    await usuario.send({
      embeds: [embeduser]
    })



 }

}