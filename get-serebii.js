const axios = require('axios');
const cheerio = require('cheerio');

const dEmbed = require('./dembed');

module.exports = {
    getPokes: function(message, name) {
        const url = 'https://www.serebii.net/pokedex-swsh/' + name;
        axios(url)

        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            name = $('.dextab h1').text().substr(1);
            pic = "https://www.serebii.net" + $('.dextable .pkmn img').attr('src');

            let pokeEmbed = dEmbed.getInfoCard(name, pic);
            message.channel.send(pokeEmbed);
        })
        .catch(console.error);
    }
}
