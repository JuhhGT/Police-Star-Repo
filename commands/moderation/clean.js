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

     if(!message.member.permissions.has("ADMINISTRATOR")){
          return message.channel.send({
               embeds: [{
                    description: "<a:negativo:877943769083822111>┊No tienes permiso de usar este **comando.**",
                    color: "RED"
               }]
          })
     } 

     if(!message.guild.me.permissions.has("ADMINISTRATOR")){
          return message.channel.send({
               embeds: [{
                    description: "<a:negativo:877943769083822111>┊No tengo permisos suficientes para usar este **comando.**",
                    color: "RED"
               }]
          })
     }

     if(!args[1] || (isNaN(args[1]) && !args[2])){
          return message.channel.send({
               embeds: [{
                    description: "<a:negativo:877943769083822111>┊Debes ingresar un número de mensajes a **borrar.**",
                    color: "RED"
               }]
          })
     }

     let number = args[2] ? parseInt(args[2]) : parseInt(args[1]);
     if(!isNaN(number) && (numer <= 100) && (number >= 1)){
          await message.delete();
     }

} 

} 