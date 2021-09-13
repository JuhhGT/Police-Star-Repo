const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "unlock", 
  alias: ["desbloquear"], 
  desc: "Desbloquea un canal", 
  usage: "<prefix>unlock", 
  userPerms: "Manejar canales", 
  botPerms: "Manejar canales", 

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

    const permsrol = message.member.roles.cache.has('806239706785775677') || message.member.roles.cache.has('806239705703120937') || message.member.roles.cache.has('878044578127679498') || message.member.roles.cache.has('878044578127679498')
    if(!permsrol){
            message.channel.send({
                 embeds: [{
                      description: "<a:negativo:877943769083822111>┊No tienes los **permisos** suficientes para usar este comando",
                      color: "RED"
                 }]
            })
            return;
}

const permsbot = message.guild.me.permissions.has("MANAGE_CHANNELS")
if(!permsbot){
  return message.channel.send({
    embeds: [{
      description: "<a:negativo:877943769083822111>┊No tienes permiso de usar este **comando.**",
      color: "RED"
    }]
  })
}    

message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
  SEND_MESSAGES: true
})

const canaldesbloq = new Discord.MessageEmbed()
.setTitle("Desbloqueo de canal")
.setDescription("<a:afirmativo:877943896947191819>┊Canal desbloqueado correctamente") 
message.channel.send({ embeds: canaldesbloq })       



 }

} 

