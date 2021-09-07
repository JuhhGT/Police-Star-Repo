const Discord = require('discord.js');

module.exports = async (client, interaction) => {

    if(!interaction.isCommand()) return;

    const cmdSlash = client.slashcommand.get(interaction.commandName)

    if(!cmdSlash){
        return
    }

    try {
        await cmdSlash.run(client, interaction)
    } catch (e) {
        console.error(e)
        return interaction.reply({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊La interacción ha **fallado.**",
                color: "RED"
            }]
        })
    }

}