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
  category: "Información",
  usage: "Despliega un menú de ayuda para cada usuario.",

async execute (client, message, args) {

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
  
  const usuario = message.author;

  const embedsuggs = new Discord.MessageEmbed()
  .setAuthor("Police Star | Team Star", "https://media.discordapp.net/attachments/848744297192751104/854834953434038302/b89c8fb332d74e787470e896fe1c73ee.png")
  .addField("Sugerencias", `${args.join(' ')}`)
  .setDescription("<:Global_Emojis:880858369966084126>┊¡Ha llegado una nueva **sugerencia!**")
  .setTimestamp()
  .setColor(("YELLOW"))
  .setFooter(`Sugerencia enviada por: ${message.author.tag}`, usuario.displayAvatarURL({ dynamic: true }))

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