const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "user-info", 
  alias: ["info-usuario"], 
  category: "Utilidad",
  usage: "Muestra la informacion de cada usuario.",

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

     let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

     let estado;
     switch (usuario.presence.status){
       case "online":
         status = "En línea.";
         break;
        case "dnd": 
        status = "No molestar.";
        break;
        case "idle": 
        status = "Ausente.";
        break;
        case "offline":
          status = "Desconectado.";
          break;
     }

     let estado2;
     switch (usuario.presence.status){
       case "online":
         status2 = "<a:estado_en_linea:882394183749488710>";
         break;
        case "dnd": 
        status2 = "<a:estado_no_molestar:882393595787759677> ";
        break;
        case "idle": 
        status2 = "<a:estado_ausente:882394195086700565>";
        break;
        case "offline":
          status2 = "<a:estado_desconectado:882394222748114974>";
          break;
     }

     function formatDate (template, date) {
      var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
      date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
      return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
        return template.split(specs[i]).join(item)
      }, template)
    } 

     if(args[1]) return;

     const embedinfo = new MessageEmbed()

     .setAuthor(usuario.user.username, usuario.user.displayAvatarURL({ dynamic: true }))
     .setDescription(`<:informacion:812066315040587776> | **Información de usuario.**`)
     .addField("<:usuario:880826682599178260> **Nombre**", `${message.author.tag}`)
     .addField("<:identificador:882375276837883905> **Identificador**", `${message.author.id}`)
     .addField(`<:roles:882393604604174337> **Roles**`, usuario.roles.cache.map(role => role.toString()).join(", "))
     .addField(":thinking: **¿Apodo?**", message.member.nickname ? message.member.nickname : "Sin apodo.")
     .addField("<:boost_lvl8:880863123609907261> **¿Booster?**", usuario.premiumSince ? 'Si, boosteo. <a:afirmativo:877943896947191819>' : 'No, no boosteo. <a:negativo:877943769083822111>')
     .addField(`${status2} **Estados**`, status)
     .addField(`<:SI:867176571537588264> **Unión al servidor**`, formatDate('DD/MM/YYYY, A las HH:mm:ss', usuario.joinedAt))
     .addField("<:discord_pensando:882400559271915600> **Unión a Discord**", formatDate('DD/MM/YYYY, A las HH:mm:ss', usuario.user.createdAt))
     .setThumbnail(usuario.user.displayAvatarURL({ dynamic: 'true' }))
     .setFooter(`Pedido por ${message.author.tag}`, usuario.user.displayAvatarURL())
     .setTimestamp()
     .setColor("WHITE")
     
     await message.channel.send({ embeds: [embedinfo] })
     
} 

} 