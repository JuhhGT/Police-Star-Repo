const Discord = require('discord.js');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('quick.db');
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();
const megadb = require('megadb');
const configwlc = new megadb.crearDB("Bienvenidas");

module.exports = async (client, message, member, args) => {

    if(!configwlc.tiene(message.guild.id)){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊Este servidor no tiene un canal de bienvenidas **establecido.**",
                color: "RED"
            }]
        })
    }

    let channel = configwlc.obtener(`Co-${message.guild.id}`, canal.id)
    if(!channel){
        return
    }

    let data = await canva.welcome(member, { link: "https://cdn.discordapp.com/attachments/806239916782649355/812436925674946592/welcum.png", blur: true })
    const atajo = new Discord.MessageAttachment(
        data, 
        "welcome.png"
    );

    channel.send({
        content: `**¡Bienvenido al servidor!** ${member}`, 
        files: [atajo]
    })




} 