const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const canalwlc = new db.crearDB("canalwlc");

const cooldown = new Set();

module.exports = {
  name: "", 
  alias: [""],
  category: "Información",
  usage: "Despliega un menú de ayuda para cada usuario.",

execute (client, message, args){

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

    

 }

} 