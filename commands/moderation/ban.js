const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require()

const cooldown = new Set();

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

    const permsrol = message.member.roles.cache.has(['878044578127679498', '880595484010483794']) //Porque hasta el momento puse que requeria de el rol Testers e Invitados.
    if(!permsrol){
        return message.channel.send({
            embeds: [{
              description: "<a:negativo:877943769083822111>┊No tienes permiso para usar este **comando.**",
              color: "RED"
            }]
          })
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
    .setDescription(`<:ban:880826676211245107>┊El usuario \`${usuario.tag}\` ha sido baneado **correctamente.**`)
    .setColor("#a2a2ff")
    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
    .setField("Razón", `${razon}`)
    .setField("Moderador", `${message.author.tag}`)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))

    const embeduser = new MessageEmbed()
    .setDescription(`<:ban:880826676211245107>┊El usuario \`${usuario.tag}\` ha sido baneado **correctamente.**`)
    .setColor("#a2a2ff")
    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
    .setField("Razón", `${razon}`)
    .setField("Moderador", `${message.author.tag}`)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))

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