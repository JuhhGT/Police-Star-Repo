const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

const cooldown = new Set();

module.exports = {
  name: "slowmode", 
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

        const permsrol = message.member.roles.cache.has('806239706785775677') || message.member.roles.cache.has('806239705703120937') || message.member.roles.cache.has('878044578127679498') || message.member.roles.cache.has('878044578127679498')
    if(!permsrol){
      return message.channel.send(
        new MessageEmbed()
        .setDescription("<a:negativo:877943769083822111>┊No tienes permiso de usar este **comando.**")
        .setColor("RED")
      )
    }

  let channel = message.channel;
  let time = args[0]

  if(time === 'off'){
      channel.setRateLimitPerUser(0)
      {
        message.channel.send({
             embeds: [{
                  description: "<a:negativo:877943769083822111>┊El modo slow a sido desactivado",
                  color: "GREEN"
             }]
        })
        return;
   }
  } 

  if(!time){
        message.channel.send({
             embeds: [{
                  description: "<a:negativo:877943769083822111>┊Debes escribir un tiempo en **MS.**",
                  color: "RED"
             }]
        })
        return;
  }

  let convert = ms(time)
  let toSecond = Math.floor(convert / 1000)

  if(!toSecond || toSecond == undefined){
        message.channel.send({
             embeds: [{
                  description: "<a:negativo:877943769083822111>┊El tiempo es **inválido.**"
             }]
        })
        return;
  }

  if(convert >= 21600 ){
        message.channel.send({
             embeds: [{
                  description: "<a:negativo:877943769083822111>┊El límite del modo slow es de **6 horas.**"
             }]
        })
        return;
  }

  await channel.setRateLimitPerUser(toSecond)
    message.channel.send({
         embeds: [{
              description: `<a:afirmativo:877943896947191819>┊El modo slow para este canal es de **${convert}** MS.`,
              color: "GREEN"
         }]
    })
    return;
}

 }