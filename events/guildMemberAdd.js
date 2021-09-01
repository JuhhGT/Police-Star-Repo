const Discord = require('discord.js');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('quick.db');
const { CanvasSenpai } = require('canvas-senpai');
const canva = new CanvasSenpai();

module.exports = async (client, member, message) => {

    let chx = db.get(`welchannel_${member.guild.id}`);
    if(!chx) return;
    let data = await canva.welcome(member, { link: "https://cdn.discordapp.com/attachments/806239916782649355/812436925674946592/welcum.png" })

    const attachment = new MessageAttachment(data, "imagen-bienvenidas.png");
    client.channels.cache.get(chx).send({
        embeds: [{
            description: `<a:afirmativo:877943896947191819>┊¡El usuario **${member.user.username}** se ha unido al servidor!`,
            color: "GREEN"
        }],
        
        files: [attachment]
    })

} 