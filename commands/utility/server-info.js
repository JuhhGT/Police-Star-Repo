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
     .addField("<:editar:880826676576145428> **Nombre del servidor**", `${message.guild.name}`)
     .addField("<:identificador:882375276837883905> **ID**", `${message.guild.id}`, true)
     .addField("<:owner_2:880839479160631357> **Dueño del servidor**", `\`${serverOwner.user.tag}\``)
     .addField("<:usuario:880826682599178260> **Miembros**", `**Total:** ${message.guild.memberCount}.\n**Miembros:** ${message.guild.members.cache.filter(x => !x.user.bot).size}.\n**Bots:** ${message.guild.members.cache.filter(x => x.user.bot).size}.`)
     .addField("<:seguridad:882372073253662720> **Nivel de seguridad**", `${message.guild.verificationLevel}`)
     .addField("<:canal:880826676265779261> **Canales**", `**Total:** ${message.guild.channels.cache.size}.\n**Categorias:** ${message.guild.channels.cache.filter(x => x.type === 'GUILD_CATEGORY').size}.\n**Texto:** ${message.guild.channels.cache.filter(x => x.type === 'GUILD_TEXT').size}.\n**Voz:** ${message.guild.channels.cache.filter(x => x.type === 'GUILD_VOICE').size}.`)
     .addField("<:roles:882393604604174337> **Roles**", `${message.guild.roles.cache.size}.`)
     .addField("<:discord_pensando:882400559271915600> **Fecha de creación**", `<t:${Math.floor(message.guild.createdTimestamp / 1e3)}:R>┊<t:${Math.floor(message.guild.createdTimestamp / 1e3)}:F>`) 
     .setColor("WHITE")
     .setFooter(`Solicitado por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

     message.channel.send({ embeds: [embedServer] })
     

} 

} 