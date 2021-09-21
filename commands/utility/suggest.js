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
  desc: "Sugiere algo para el servidor (cualquier mal uso de este comando puede ser sancionable).",
  usage: "Sugiere cosas para el servidor.",
  userPerms: "",
  botPerms: "",

  /**
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   * @param {Number} length 
   */

async execute (client, message, args, length) {

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

  if(!canalsuggest.tiene(message.guild.id)){
    return message.channel.send({
      embeds: [{
        description: "<a:negativo:877943769083822111>┊Este servidor no tiene un canal de sugerencias **establecido.**",
        color: "RED"
      }]
    })
  }

  const cosaSugerida = args.slice(0).join(' ');

  if(!cosaSugerida){
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

  const identificator = idSystem(4)
  
  const usuario = message.author;

  const embedsuggs = new Discord.MessageEmbed()
  .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
  .setDescription("<:Global_Emojis:880858369966084126>┊¡Ha llegado una nueva **sugerencia!**")
  .addField(`Sugerencia`, `${args.join(' ')}`)
  .setFooter(`ID de sugerencia: ${identificator}`)
  .setTimestamp()
  .setColor(("YELLOW"))

  const canal = await canalsuggest.obtener(message.guild.id)

  client.channels.cache.get(canal).send({embeds: [embedsuggs]}).then(msg => {
    msg.react('<a:afirmativo:877943896947191819>')
    msg.react('<a:negativo:877943769083822111>')
    autor.establecer(msg.id, usuario.id)
    sugerencia.establecer(`${identificator}`, args.join(' '))
  })

  message.channel.send({
    embeds: [{
      description: "<a:afirmativo:877943896947191819>┊Tu sugerencia ha sido enviada **exitosamente.**",
      color: "GREEN"
    }]
  })
    
}

} 