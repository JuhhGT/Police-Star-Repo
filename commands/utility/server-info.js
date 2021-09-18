const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "server-info", 
  alias: ["info-usuario"], 
  category: "Utilidad",
  desc: "Muestra la información de un usuario.",
  usage: "`<prefix>user-info [usuario]`.",
  userPerms: "",
  botPerms: "",

  /**
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   */


async execute (client, message, args) {

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

     if(args[0]) return;
     
     const serverOwner = await message.guild.fetchOwner()
     
     const embedServer = new Discord.MessageEmbed()
     .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
     .setDescription("<:servidores:884105699821506670>┊Información del **servidor**")
     .setThumbnail(message.guild.iconURL({ dynamic: true }))
     .addField("**Nombre del servidor**", `${message.guild.name}`)
     .addField("**ID**", `${message.guild.id}`)
     .addField("**Dueño del servidor**", `\`${serverOwner.user.tag}\``)
     .addField("**Miembros**", `Total: ${message.guild.memberCount}.\nMiembros: ${message.guild.members.cache.filter(x => !x.user.bot).size}.\nBots: ${message.guild.members.cache.filter(x => x.user.bot).size}.`)
     .addField("**Nivel de seguridad**", `${message.guild.verificationLevel}`)
     .addField("**Canales**", `Total: ${message.guild.channels.cache.size}.\nCategorias: ${message.guild.channels.cache.filter(x => x.type === 'GUILD_CATEGORY').size}.\nTexto: ${message.guild.channels.cache.filter(x => x.type === 'GUILD_TEXT').size}.\nVoz: ${message.guild.channels.cache.filter(x => x.type === 'GUILD_VOICE').size}.`)
     .addField("**Roles**", `${message.guild.roles.cache.size}.`)
     .addField("**Fecha de creación**", `<t:${Math.floor(message.guild.createdTimestamp / 1e3)}>`) 
     .setColor("WHITE")
     .setFooter(`Solicitado por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

     message.channel.send({ embeds: [embedServer] })
     

} 

} 