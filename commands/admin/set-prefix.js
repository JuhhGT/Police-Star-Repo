const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const prefixes = new db.crearDB("prefixes");

const cooldown = new Set();

module.exports = {
  name: "set-prefix", 
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
    if(!permsrol) return message.channel.send({
    embeds: [{
      description: "<a:negativo:877943769083822111>┊No cuentas con los **permisos** necesarios para usar este comando.",
      color: "RED"
    }]
  })

  if(!args[0]){
    return message.channel.send({
      embeds: [{
        description: "<a:negativo:877943769083822111>┊Debes ingresar un nuevo **prefix.**",
        color: "RED"
      }]
    })
  } 

  const prefix = await prefixes.obtener(message.guild.id)

  if (args[0] == prefix){
    return message.channel.send({
      embeds: [{
        description: "<a:negativo:877943769083822111>┊El prefix ingresado ya ha sido **establecido.**",
        color: "RED"
      }]
    })
  }

  prefixes.establecer(message.guild.id, args[0])

  message.channel.send({
    embeds: [{
      description: `<a:afirmativo:877943896947191819>┊El prefix a sido cambiado exitosamente a \`${args[0]}\`.`,
      color: "GREEN"
    }]
  })
 }

} 