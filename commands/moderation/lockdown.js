const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "lockdown", //Nombre del comando.
  alias: ["bloquear-canal"], //Alias del comando, si hay muchos alias es ["hola", "hi"] sino hay alias dejarlo asi: [],
  category: "Moderación", //Categoria del comando.
  desc: "Bloquea un canal para todos los usuarios.", //Descripción del comando.
  usage: "`<prefix>lockdown [Canal]`", //Uso del comando.
  userPerms: "Administrador.", //Permisos del usuario necesarios.
  botPerms: "Gestionar canales | Gestionar roles.", //Permisos del bot necesarios.

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

    var perm

 }

} 

