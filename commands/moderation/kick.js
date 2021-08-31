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
        if(!permsrol){
                message.channel.send({
                     embeds: [{
                          description: "<a:negativo:877943769083822111>┊No tienes los **permisos** suficientes para usar este comando",
                          color: "RED"
                     }]
                })
                return;
  }

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
  
  

  var razon = args.slice(1).join(' ')
  if(!razon){
      razon = 'No especificada.'
  }

     const kick = new Discord.MessageEmbed()
      .setTitle("Usuario Expulsado.")
      .setDescription(`<a:afirmativo:877943896947191819>┊${user} ha sido expulsado del servidor exitosamente.`)
      .addField("Razón", `${razon}`)
      .setFooter(`Responsable de la acción┊${message.author.username}`, message.author.displayAvatarURL())
      .setColor("GREEN")
      .setAuthor(user.user.tag, user.user.displayAvatarURL())
      .setTimestamp()
      message.channel.send({ embeds: [kick] })
      
      await user.user.send(
      new MessageEmbed()
      .setTitle("Has sido sancionado.")
      .setColor("YELLOW")
      .setDescription(`<:advertencia:806249550956068875>┊Te han sancionado en el servidor \`**Team Star**\` con la siguiente razón: "${razon}".\n\n<a:comprendido:808108747997970481>┊Te aconsejamos leer las <#806239921018896394> para que evites este tipo de inconvenientes.`)
      )
      await user.kick(razon);

 }

} 