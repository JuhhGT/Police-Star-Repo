const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "user-info", 
  alias: ["info-usuario"], 
  category: "Información",
  usage: "Despliega un menú de ayuda para cada usuario.",

  /**
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   */

execute (client, message, args) {

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

     let estado;
     switch (user.presence.status){
       case "online":
         status = "<:verde:878981722262339634> En línea.";
         break;
        case "dnd": 
        status = "<:rojo:878981722421755924> No molestar.";
        break;
        case "idle": 
        status = "<:amarillo:878981722300117022> Ausente.";
        break;
        case "offline":
          status = "<:azul:878981722102984705> Desconectado.";
          break;
     }

     if(args[0]) return;

     let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

     const embedinfo = new MessageEmbed()

     .setAuthor(usuario.user.username, usuario.user.displayAvatarURL({ dynamic: true }))
     .setDescription(`<:informacion:812066315040587776> | **Información de usuario.**`)
     .addField("<:usuario:880826682599178260> Nombre <:usuario:880826682599178260>", `${message.author.tag}`, true)
     .addField("<:identificador:882375276837883905> ID <:identificador:882375276837883905>", `${message.author.id}`, true)
     .addField("<:menciones_recientes:880835880170946630> Roles <:menciones_recientes:880835880170946630>", user.roles.cache.map(role => role.toString()).join(", "), true)
     .addField(":thinking: ¿Apodo? :thinking:", message.member.nickname ? message.member.nickname : "Sin apodo.", true)
     .addField("<:boost_lvl8:880863123609907261> ¿Booster? <:boost_lvl8:880863123609907261>", member.premiumSince ? 'Si, boosteo.' : 'No, no boosteo.')
     .setThumbnail(usuario.user.displayAvatarURL({ format: 'png', dynamic: 'true' }))
     .setColor("WHITE")
     
     message.channel.send({ embeds: [embedinfo] })
     
} 

} 