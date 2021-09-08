const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { inspect } = require("util");

const cooldown = new Set();

module.exports = {
  name: "eval", 
  alias: ["e"],
  category: "Privado",
  usage: "Comando privado.",

  /**
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   */

execute (client, message, args){

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

    if(!['749895975694499930', '593933465750339611', '874441564255035454', '657712656945512488', '606522810948648970'].includes(message.author.id)) {
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊No tienes permiso usar el comando **ingresado.**",
                color: "RED"
            }]
        })
    }

    const command = args.join(" ")
    if(!command){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊Debes escribir un comando a **evaluar.**",
                color: "RED"
            }]
        })
    }
  
    try {
      const evaled = eval(command)
      let palabras = ["token", "destroy"]
      if(palabras.some(word => message.content.toLowerCase().includes(word))){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊Esas palabras no son **validas.**",
                color: "RED"
            }]
        })
      }
      
      const embed = new Discord.MessageEmbed()
  
      .setColor("GREEN")
      .setTitle("Evaluado Correctamente!")
      .addField(`**Tipo**:`, `\`\`\`prolog\n${typeof(evaled)}\`\`\``, true)
      .addField("**Evaluado en:**", `\`\`\`yaml\n${Date.now() - message.createdTimestamp}ms\`\`\``, true)
      .addField(`**Entrada**`, `\`\`\`js\n${command}\`\`\``)
      .addField(`**Salida**`, `\`\`\`js\n${inspect(evaled, {depth: 0})}\`\`\``)
  
      message.channel.send({embeds: [embed]})
    } catch (error) {
      const embedfallo = new Discord.MessageEmbed()
  
      .setColor("RED")
      .addField(`Entrada`, `\`\`\`js\n${command}\`\`\``)
      .addField(`Error`, `\`\`\`js\n${error}\`\`\``)
  
      message.channel.send({ embeds: [embedfallo ]})
      
    }
  
   }
  
  }
