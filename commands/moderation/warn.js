const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('megadb')
const warns = new db.crearDB('warns')
     
     
     module.exports = {
       name: "warn", 
       alias: ["aviso"],
       category: "Moderación",
       usage: "",
     
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
         
         if(cooldown.has(message.author.id)){
             message.channel.send({ embeds: [cooldownem] })
     
            return;
         }
     
         cooldown.add(message.author.id);
     
         setTimeout(() => {
             cooldown.delete(message.author.id);
         }, 3000);
         let mencionado = message.mentions.members.first()
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
   
       const idwarneados = idSystem(4)

       var razon = args.slice(1).join(" ")
       if(!razon) razon = 'No especificada'

       if (!warns.tiene(`${message.guild.id}.${persona.id}`)) {
        warns.establecer(`${message.guild.id}.${persona.id}`, { warns: 0})
      }

      warns.sumar(`${message.guild.id}.${persona.id}.warns`, 1)

      const warnemb = new Discord.MessageEmbed()
     .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
     .setDescription(`<a:afirmativo:877943896947191819>┊El usuario \`${message.mentions.members.first().tag}\` ha sido warneado **correctamente.**`)
     .addField("Razón", `${razon}`)
     .addField("Moderador", `${message.author.tag}`)
     .setFooter(`ID Sanción: ${idSystem(4)}`)
     .setTimestamp()
     .setColor("#a2a2ff")
      message.channel.send({ embeds: [warnemb] }) 

      const embuser = new MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:seguridad:882372073253662720> Te han warneado del servidor ${message.guild.name}.\n\n**Tu sanción es permanente.**\n**Razón:** ${razon}`)
      .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setTimestamp()
      .setColor("#c7f3ff")
  
      usuario.ban({ reason: razon }).catch((e) => message.channel.send({
        embeds: [{
          description: "<a:negativo:877943769083822111>┊Ha ocurrido un error **desconocido.**",
          color: "RED"
        }]
      })).then(() => message.channel.send({ embeds: [warnemb] })).then(msg => {
        setTimeout(() => {
          msg.delete()
        }, 3000);
      })
  
      await usuario.send({
        embeds: [embuser]
      })
    }
     
      }