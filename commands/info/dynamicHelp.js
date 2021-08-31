const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

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

    const data = []

    if(!args[0]){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊Debes colocar un comando, recuerda que para abrir el menú de ayuda debes ingresar `p/menuhelp`.",
                color: "RED"
            }]
        })
    }

    const name = args[0]
    const Command = client.commands.get(name) || client.commands.find(x => x.alias && x.alias.includes(name));
    if(!Command){
        return message.channel.send({
            content: "<a:negativo:877943769083822111>┊El comando escrito no **existe.**"
        })
    }

    const embedito = new Discord.MessageEmbed()
    .setTitle("Información de comandos")
    .setColor("GREEN")
    .setFooter('Pedido por: '+ message.author.tag)
    .setTimestamp()

    data.push({embeds: [embedito.addField(`**Nombre:**`, Command.name)]})
    if(Command.alias){
        data.push({embeds: [embedito.addField(`**Alias:**`, Command.alias.join(', ') || "Sin alias.")]})
    }

    data.push({embeds: [embedito.addField(`**Categoría:**`, Command.category || "Sin categoria.")]})
    data.push({embeds: [embedito.addField(`**Uso:**`, Command.usage || "Sin descripcion.")]})
    data.push({embeds: [embedito.addField(`**Cooldown:**`, Command.cooldown || "Sin cooldown.")]})
    data.push({embeds: [embedito.addField(`**Ejemplos:**`, Command.example || "Sin ejemplos.")]})

    message.channel.send({data, embeds: [embedito], split: true})

 }

} 