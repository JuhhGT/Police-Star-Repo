const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "unban", 
  alias: ["desbanear"],
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
        return message.channel.send(
            new MessageEmbed()
            .setDescription("<a:negativo:877943769083822111>┊No tienes permiso de usar este **comando.**")
            .setColor("RED")
        )
    }

    if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            message.channel.send({
                 embeds: [{
                      description: "<a:negativo:877943769083822111>┊No tengo permisos para usar este comando",
                      color: "RED"
                 }]
            })
            return;
       }

    let userID = args[0];
    if(!userID){
            message.channel.send({
                 embeds: [{
                      description: "<a:negativo:877943769083822111>┊Debes escribir una **ID.**",
                      color: "RED"
                 }]
            })
            return;
       }


     const member = await client.users.fetch(userID)

     message.guild.bans.fetch().then(bans => {
          if(bans.size === 0){
               message.channel.send({
                    embeds: [{
                         description: "<a:negativo:877943769083822111>┊El servidor no tiene ningún miembro baneado",
                         color: "RED"
                    }]
               })
               return;
          }
          if(!bans.has(userID)){
               message.channel.send({
                    embeds: [{
                         description: "<a:negativo:877943769083822111>┊El miembro mencionado no ha sido **baneado.**",
                         color: "RED"
                    }]
               })
               return;
          }
          else {
               message.guild.members.unban(member.id)
               
               const unban = new Discord.MessageEmbed()
               .setDescription(`<a:afirmativo:877943896947191819>┊El usuario \`${member.tag}\` ha sido desbaneado **correctamente.**`)
               .setColor("GREEN")
               .setTimestamp()
               message.channel.send({ embeds: [unban] })
          }
     })
   }
} 