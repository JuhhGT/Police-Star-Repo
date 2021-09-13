const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "clean", 
  alias: ["borrar"], 
  category: "Información",
  usage: "Despliega un menú de ayuda para cada usuario.",

  /** 
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   */

async execute (client, message, args) {

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

     message.delete();
     let perms = message.member.permissions.has("ADMINISTRATOR")
     if(!perms){
          return message.channel.send({
               embeds: [{
                    description: "<a:negativo:877943769083822111>┊No tienes permiso de usar este **comando.**",
                    color: "RED"
               }]
          })
     }

     if(!args[0]){
          return message.channel.send({
               embeds: [{
                    description: "<a:negativo:877943769083822111>┊Ingresa una cantidad de mensajes a **borrar.**",
                    color: "RED"
               }]
          })
     }

     if(isNaN(args[0])){
          return message.channel.send({
               embeds: [{
                    description: "<a:negativo:877943769083822111>┊El número ingresado es **inválido.**",
                    color: "RED"
               }]
          })
     }

     if(args[0] < 1){
          return message.channel.send({
               embeds: [{
                    description: "<a:negativo:877943769083822111>┊La cantidad minima de mensajes a borrar **1.**",
                    color: "RED"
               }]
          })
     }

     if(args[0] > 100){
          return message.channel.send({
               embeds: [{
                    description: "<a:negativo:877943769083822111>┊No puedo borrar más de **100** mensajes.",
                    color: "RED"
               }]
          })
     }

     message.channel.bulkDelete(args[0]).then(mensaje => {
          let embed = new MessageEmbed()
          .setDescription(`<a:afirmativo:877943896947191819>┊Se han borrado **${args[0]} mensajes** correctamente.`)
          .setColor("GREEN")
          .setTimestamp()
          .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
          return message.channel
          .send({ embeds: [embed] })
          .then(msg => setTimeout(() => msg.delete(), 5000) )
     });

  } 
} 