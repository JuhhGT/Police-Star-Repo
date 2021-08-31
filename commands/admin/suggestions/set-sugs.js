    const Discord = require('discord.js');
    const { MessageEmbed } = require('discord.js');
    const db = require('megadb');
    const canalsuggest = new db.crearDB('canalsuggest');

    const cooldown = new Set();

    module.exports = {
        name: "set-sugs", 
        alias: ["canal-sugerencias"], 
        category: "Utilidad",
        usage: "Muestra el ping en MS del bot.",
      
      execute (client, message, args) {
      
        if(cooldown.has(message.author.id)){
          message.channel.send({
            embeds: [{
              description: "<a:negativo:877943769083822111>┊**¡Calmate!** espera 3s para volver a usar este **comando.**",
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
            return message.channel.send({
                embeds: [{
                    description: "<a:negativo:877943769083822111>┊No tienes permiso de usar este **comando.**",
                    color: "RED"
                }]
            })
        }

        const canal = message.mentions.channels.first() || client.channels.resolve(args[0])
        if(!canal){
            return message.channel.send({
                embeds: [{
                    description: "<a:negativo:877943769083822111>┊Debes mencionar un **canal.**",
                    color: "RED"
                }]
            })
        }

        const canalservidor = message.guild.channels.resolve(canal.id)
        if(!canalservidor){
            return message.channel.send({
                embeds: [{
                    description: "<a:negativo:877943769083822111>┊El canal debe estar dentro del **servidor.**",
                    color: "RED"
                }]
            })
        }

        canalsuggest.establecer(`${message.guild.id}`, `${canal.id}`) 

        message.channel.send({
            embeds: [{
                description: `<a:afirmativo:877943896947191819>┊El canal de sugerencias ha sido establecido a ${canal} **correctamente.**`,
                color: "GREEN"
            }]
        })

    }

    } 