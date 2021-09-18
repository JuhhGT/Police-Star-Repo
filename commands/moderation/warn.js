const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const { set } = require('quick.db');
const advertencias = new db.crearDB('advertencias')

const cooldown = new Set()
     
     
     module.exports = {
       name: "warn", 
       alias: ["aviso"],
       category: "Moderación",
       usage: "",

       /**
        * @param {Discord.Client} client 
        * @param {Discord.Message} message 
        * @param {string[]} args 
        */
     
     async execute (client, message, args){
     
      const cooldownem = new Discord.MessageEmbed()
      .setDescription("<a:negativo:877943769083822111>┊**¡Cálmate!** espera 3s para volver a usar este **comando.**")
      .setColor("RED")
      
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

       if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
          message.channel.send({
               embeds: [{
                    description: "<a:negativo:877943769083822111>┊No tengo permisos suficientes para usar este **comando.**",
                    color: "RED"
               }]
          })
          return;
       }

       let persona = message.mentions.members.first() || message.guild.members.cache.get(args[0])
       if(!persona) {
          return message.channel.send({
               embeds: [{
                    description: "<a:negativo:877943769083822111>┊Debes mencionar el nombre de la persona que quieres **advertir.**",
                    color: "RED"
               }]
          })
       }

       if(persona == message.author) {
          return message.channel.send({
               embeds: [{
                    description: "<a:negativo:877943769083822111>┊No puedes **advertirte** a ti mismo.",
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
   
       const idAdvertidos = idSystem(4)

       var razon = args.slice(1).join(" ")
       if(!razon) razon = 'No especificada.'

       if (!advertencias.tiene(`${message.guild.id}.${persona.id}`)) {
        advertencias.establecer(`${message.guild.id}.${persona.id}`, 0)
      }

      advertencias.sumar(`${message.guild.id}.${persona.id}`, 1)

      const warnemb = new Discord.MessageEmbed()
     .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
     .setDescription(`<a:afirmativo:877943896947191819>┊¡El usuario \`${persona.user.tag}\` ha sido **advertido!**`)
     .addField("Razón", `${razon}`)
     .addField("Moderador", `${message.author.tag}`)
     .setFooter(`ID Sanción: ${idSystem(4)}`)
     .setTimestamp()
     .setColor("#a2a2ff")

     message.channel.send({
       embeds: [warnemb]
     })

      const embuser = new MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`<:seguridad:882372073253662720> Te han warneado del servidor ${message.guild.name}.\n\n**Tu sanción es permanente.**\n**Razón:** ${razon}`)
      .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setTimestamp()
      .setColor("#c7f3ff")

      try {
        await persona.send({
          embeds: [embuser]
        })
      } catch (e) {
        message.channel.send({
          embeds: [{
            description: "<a:negativo:877943769083822111>┊No se ha podido enviar un mensaje privado a la persona **advertida.**",
            color: "RED"
          }]
        })
      }
    }
     
}