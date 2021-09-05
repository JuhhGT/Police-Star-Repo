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
        let mencionado = message.mentions.members.first()
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
  
  
message.guild.member(user).kick(razon);

  var razon = args.slice(1).join(' ')
  if(!razon){
      razon = 'No especificada.'
  }

     const kicemb = new Discord.MessageEmbed()

     .setAuthor("Sanción", `${message.author.displayAvatarURL({ dynamic: true })}`)
     .addField("Tipo:", `Kick`)
     .addField("Infractor:", `${mencionado.user.tag}`)
     .addField("Razón:", `${razon}`)
     .addField("Moderador:", `${message.author.tag}`) //Cerraré el PC.
     .setColor("RED")

      message.channel.send({ embeds: [kicemb] })
      

 }

} 