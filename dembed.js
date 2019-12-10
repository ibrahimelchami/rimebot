const Discord = require('discord.js');

module.exports = {
    getInfoCard: function(color, name, type, sprite_shiny, sprite_reg) {
        var pokeEmbed = new Discord.RichEmbed()
        pokeEmbed.setColor(color)
        console.log("hi")
        pokeEmbed.setTitle(name)
        pokeEmbed.addField('Type', type)
        pokeEmbed.setThumbnail(sprite_shiny)
        pokeEmbed.setImage(sprite_reg)
        return pokeEmbed;
    }
}
