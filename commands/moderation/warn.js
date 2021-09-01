const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
     
     const cooldown = new Set();
     
     module.exports = {
       name: "warn", 
       alias: ["aviso"],
       category: "Moderación",
       usage: "",
     
     execute (client, message, args){
     
      if(cooldown.has(message.author.id)){
        message.channel.send({
          embeds: [{
            description: "<a:negativo:877943769083822111>┊**¡Calmate!** espera 3s para volver a usar este **comando.**",
            color: "RED"
          }]
        })
    
         return;
         
      }
         
         if(cooldown.has(message.author.id)){
             message.channel.send({ embeds: [cooldownem] })
     
            return;
         }
     
         cooldown.add(message.author.id);
     
         setTimeout(() => {
             cooldown.delete(message.author.id);
         }, 3000);
     
         const permsrol = message.member.roles.cache.has('806239706785775677') || message.member.roles.cache.has('806239705703120937') || message.member.roles.cache.has('878044578127679498') || message.member.roles.cache.has('878044578127679498')
         if(!permsrol) {
            message.channel.send({
                 embeds: [{
                      description: "<a:negativo:877943769083822111>┊No tienes suficientes **permisos** para usar este comando.",
                      color: "RED"
                 }]
            })
            return;
       }
       if (!message.guild.me.permissions.has('KICK_NEMBERS')) {
          message.channel.send({
               embeds: [{
                    description: "<a:negativo:877943769083822111>┊No tengo permisos suficientes para usar este comando",
                    color: "RED"
               }]
          })
          return;
       }
       let persona = message.mentions.users.first()
       if(!persona) {
          message.channel.send({
               embeds: [{
                    description: "<a:negativo:877943769083822111>┊Debes mencionar el nombre de la persona que quieres **warnear.**",
                    color: "RED"
               }]
          })
          return;
       }
       if(persona == message.author) {
          message.channel.send({
               embeds: [{
                    description: "<a:negativo:877943769083822111>┊No puedes **warnearte** a ti mismo.",
                    color: "RED"
               }]
          })
          return;
       }
       var razon = args.slice(1).join(" ")
       if(!razon) razon = 'No especificada'

       if (!warns.tiene(`${message.guild.id}.${persona.id}`)) {
        warns.establecer(`${message.guild.id}.${persona.id}`, { warns: 0})
      }

      warns.sumar(`${message.guild.id}.${persona.id}.warns`, 1)

      const warn = new Discord.MessageEmbed()
      .setTitle("AVISO")
      .setDescription(`Moderador: **${message.author.tag}**\n\nInfractor: **${persona.tag}**\n\nRazón: **${razon}**`)
      .setColor("GREEN")
      .setFooter("Police Star | Team Star")
      .setTimestamp()
      message.channel.send({ embeds: [warn] }) 
    }
     
      }