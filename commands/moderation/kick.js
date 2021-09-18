const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "kick", 
  alias: ["expulsar"],
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

        const permsrol = message.member.roles.cache.has('806239706785775677') || message.member.roles.cache.has('806239705703120937') || message.member.roles.cache.has('878044578127679498') || message.member.roles.cache.has('878044578127679498')
        let usuario = message.mentions.members.first()
        if(!permsrol){
                message.channel.send({
                     embeds: [{
                          description: "<a:negativo:877943769083822111>┊No tienes los **permisos** suficientes para usar este comando",
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

  const idkickeados = idSystem(4)

  if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
        message.channel.send({
             embeds: [{
                  description: "<a:negativo:877943769083822111>┊No tengo los suficientes **permisos.**",
                  color: "RED"
             }]
        })
        return;
  }
  

  const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!user){
    message.channel.send({
         embeds: [{
              description: "<a:negativo:877943769083822111>┊Debes mencionar a un **usuario.**",
              color: "RED"
         }]
    })
    return;
}

  if(user.id === message.author.id){
    message.channel.send({
         embeds: [{
              description: "<a:negativo:877943769083822111>┊No te puedes **expulsar** a ti mismo.",
              color: "RED"
         }]
    })
    return;
}

  if(message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0){
    message.channel.send({
         embeds: [{
              description: "<a:negativo:877943769083822111>┊No puedes expulsar a una persona de mayor o igual **poder / rol** que tu.",
              color: "RED"
         }]
    })
    return;
}
  
  
message.guild.member(user).kick(razon);

  var razon = args.slice(1).join(' ')
  if(!razon){
      razon = 'No especificada.'
  }

  const kickemb = new MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`<a:afirmativo:877943896947191819>┊El usuario \`${message.mentions.members.first().tag}\` ha sido kickeado **correctamente.**`)
    .addField("Razón", `${razon}`)
    .addField("Moderador", `${message.author.tag}`)
    .setFooter(`ID Sanción: ${idSystem(4)}`)
    .setTimestamp()
    .setColor("#a2a2ff")
     message.channel.send({ embeds: [kicemb] })

     const embuser = new MessageEmbed()
     .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
     .setDescription(`<:martillo:879853908468576276>  Te han kickeado del servidor ${message.guild.name}.\n\n**Tu sanción es permanente.**\n**Razón:** ${razon}`)
     .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
     .setTimestamp()
     .setColor("#c7f3ff")
 
     usuario.ban({ reason: razon }).catch((e) => message.channel.send({
       embeds: [{
         description: "<a:negativo:877943769083822111>┊Ha ocurrido un error **desconocido.**",
         color: "RED"
       }]
     })).then(() => message.channel.send({ embeds: [kickemb] })).then(msg => {
       setTimeout(() => {
         msg.delete()
       }, 3000);
     })
 
     await usuario.send({
       embeds: [embuser]
     })
      

 }

} 