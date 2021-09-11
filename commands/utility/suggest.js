const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const autor = new db.crearDB('Autor');
const sugerencia = new db.crearDB('sugerencia');
const canalsuggest = new db.crearDB('canalsuggest');

const cooldown = new Set();

module.exports = {
  name: "sugerir", 
  alias: ["suggest"], 
  category: "Utilidad",
  usage: "Sugiere cosas para el servidor.",

  /**
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   * @param {Number} length 
   */

async execute (client, message, args, length) {

  const cooldownem = new Discord.MessageEmbed()
  .setDescription("<a:negativo:877943769083822111>┊**¡Calmate!** espera 3s para volver a usar este **comando.**")
  .setColor("RED")
  
  if(cooldown.has(message.author.id)){
      message.channel.send({ embeds: [cooldownem] })

     return;
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
      cooldown.delete(message.author.id);
  }, 3000);

  if(!canalsuggest.tiene(message.guild.id)){
    return message.channel.send({
      embeds: [{
        description: "<a:negativo:877943769083822111>┊Este servidor no tiene un canal de sugerencias **establecido.**",
        color: "RED"
      }]
    })
  }

  if(!args.join(' ')){
    return message.channel.send({
      embeds: [[{
        description: "<a:negativo:877943769083822111>┊Debes escribir una **sugerencia.**",
        color: "RED"
      }]]
    })
  }

  message.delete()

  function idSystem(length) {
    if(!length) length = 4;
    let ids = '0123456789';
    let result = "";
    for (var i = 0; i < length; i++) {
      result += ids.charAt(Math.floor(Math.random() * ids.length));
    }
    return result
  }
  
  const usuario = message.author;

  const embedsuggs = new Discord.MessageEmbed()
  .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
  .addField("Sugerencia", `${args.join(' ')}`)
  .setDescription("<:Global_Emojis:880858369966084126>┊¡Ha llegado una nueva **sugerencia!**")
  .setTimestamp()
  .setColor(("YELLOW"))
  .setFooter(`ID de sugerencia: ${idSystem(4)}`)

  const canal = await canalsuggest.obtener(message.guild.id)

  client.channels.cache.get(canal).send({embeds: [embedsuggs]}).then(msg => {
    msg.react('<a:afirmativo:877943896947191819>')
    msg.react('<a:negativo:877943769083822111>')
    autor.establecer(msg.id, usuario.id)
    sugerencia.establecer(msg.id, args.join(' '))
  })

  message.channel.send({
    embeds: [{
      description: "<a:afirmativo:877943896947191819>┊Tu sugerencia ha sido enviada **exitosamente.**",
      color: "GREEN"
    }]
  })
    
}

} 