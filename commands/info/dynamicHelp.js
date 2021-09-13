const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const prefixes = new db.crearDB('prefixes');

const cooldown = new Set();

module.exports = {
  name: "help", 
  alias: [],
  category: "Información.",
  usage: "Ayuda sobre comandos, `p/help <Comandos>`",

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

    const prefix = await prefixes.obtener(message.guild.id)

    const data = []

    const name = args[0]
    if(!name){
        return message.channel.send({
            embeds: [{
                description: `<a:negativo:877943769083822111>┊Debes escribir un **comando.**\nEscribe \`${prefix}menuhelp\` para ver el menú de ayuda.`,
                color: "RED"
            }]
        })
    }
    const Command = client.commands.get(name) || client.commands.find(x => x.alias && x.alias.includes(name));
    if(!Command){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊El comando escrito no **existe.**",
                color: "RED"
            }]
        })
    }

    const embedito = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`Información de **${name},** escribe \`${prefix}help <Comando>\`.`)
    .setFooter("Ayuda de Police Star", client.user.displayAvatarURL({ format: "png" }))
    .setTimestamp()
    .setColor("#c1a7ff")

    data.push({embeds: [embedito.addField(`**Nombre:**`, Command.name)]})
    if(Command.alias){
        data.push({embeds: [embedito.addField(`**Alias:**`, Command.alias.join(', ') || "Sin alias.")]})
    }

    data.push({embeds: [embedito.addField(`**Categoría:**`, Command.category || "Sin categoria.")]})
    data.push({embeds: [embedito.addField(`**Descripción:**`, Command.desc || "Sin descripcion.")]})
    data.push({embeds: [embedito.addField(`**Uso:**`, Command.usage || "Sin descripcion de uso.")]})
    data.push({embeds: [embedito.addField(`**Permisos requeridos:**`, Command.userPerms || "Todos los permisos.")]})
    data.push({embeds: [embedito.addField(`**Permisos del bot:**`, Command.botPerms || "Sin permisos requeridos.")]})

    message.channel.send({data, embeds: [embedito], split: true})

 }

} 