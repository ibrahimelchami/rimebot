const Discord = require('discord.js');

// module.exports = {
//     getInfoCard: function(color, name, type, sprite_shiny, sprite_reg) {
//         var pokeEmbed = new Discord.RichEmbed()
//         pokeEmbed.setColor(color)
//         pokeEmbed.setTitle(name)
//         pokeEmbed.addField('Type', type)
//         pokeEmbed.setThumbnail(sprite_shiny)
//         pokeEmbed.setImage(sprite_reg)
//         return pokeEmbed;
//     }
// }

module.exports = {
    getInfoCard: function(name, sprite) {
        var pokeEmbed = new Discord.RichEmbed()
        pokeEmbed.setTitle(name)
        pokeEmbed.setImage(sprite)
        return pokeEmbed;
    }
}
