const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();

const dEmbed = require('./dembed');

function titleCase(str) {
    str = str[0].toUpperCase() + str.substr(1);
    return str;
}

const vowels = 'aeiouAEIOU';

client.once('ready', () => {
console.log('Ready!')
})

client.on('message', message => {
    if(message.content.startsWith(`${prefix}`) && (!message.author.bot)) {
        //kickFunction
        if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            if(message.content.startsWith(`${prefix}kick`)) {
                let member = message.mentions.members.first();
                if(member != undefined) {
                    member.kick().then((member) => {
                         message.channel.send(":wave: " + member.displayName + " has been kicked!")
                    })
                }
            }
        }

        //PokedexTypeSerch
        if(message.content.startsWith(`${prefix}dex`)) {
                let search = message.content.toLowerCase().replace('.', '');
                if(search.includes("mr mime") || search.includes("mime jr") || search.includes("tapu koko")) {
                    search = search.split(" ")[1] + '-' + search.split(" ")[2];
                } else {
                    search = search.split(" ")[1];
                }
                let pokemon = search;
                let Pokedex = require("pokedex-promise-v2");
                let Poke = {};
            Poke["pokedex-promise-v2"] = new Pokedex()
            pokemon = Poke["pokedex-promise-v2"].getPokemonByName(pokemon) // with Promise

            .then(function (response) {
                let pokedata = response;
                //id
                let pokeid = String(pokedata.id);
                if(pokeid.length < 3) {
                    if(pokeid.length > 1) {pokeid = '0' + pokeid}
                    else(pokeid = '00' + pokeid)
                }
                //name&grammar
                let pokename = pokedata.forms[0].name;
                pokename = titleCase(pokename);
                let type;
                //sentenceMaking
                if(pokedata.types.length == 2) {
                    type = titleCase(pokedata.types[1].type.name) + ' & ' + titleCase(pokedata.types[0].type.name);
                } else {
                    type = titleCase(pokedata.types[0].type.name);
                }
                let sprite_shiny = 'https://www.serebii.net/Shiny/SWSH/' + pokeid + '.png'
                let sprite_reg = 'https://www.serebii.net/swordshield/pokemon/' + pokeid + '.png'
                let color = "#FF0000";
                let pokeEmbed = dEmbed.getInfoCard(color, pokename, type, sprite_shiny, sprite_reg);
                message.channel.send(pokeEmbed);
            })

            .catch(function (error) {
                message.channel.send("That's not a Pokémon!");
            });
        }
    }

})

client.login(token);



// let grmr = ' is a '
// if(vowels.indexOf(pokedata.types[0].type.name[0]) == 1) {
//     grmr = ' is an '
// }
// if(pokedata.types.length == 2) {
//     type = pokename + grmr + pokedata.types[1].type.name + ' & ' + pokedata.types[0].type.name + ' type pokemon! Rime!';
// } else {
//     type = pokename + grmr + pokedata.types[0].type.name + ' type pokemon! Rime!';
// }
// message.channel.send(type);

// let str1 = 'ello';
// var vowel_list = 'aeiouAEIOU'
// console.log(vowel_list.indexOf(str1[0]);

// types: [ { slot: 1, type: [Object] } ]

// let Pokedex = require('pokedex-promise-v2');
// let Poke = {};
// Poke["pokedex-promise-v2"] = new Pokedex()
// Poke["pokedex-promise-v2"].getPokemonByName('eevee') // with Promise
// .then(function (response) {
//     console.log(response);
// })
//
// .catch(function (error) {
//     console.log('There was an ERROR: ', error);
// });

// const fetch = require("node-fetch");
// const apiData = {
//     url: 'https://pokeapi.co/api/v2/',
//     type: 'pokemon-species',
//     id: '25',
// }
//
// const {url, type, id} = apiData
// const apiUrl = `${url}${type}/${id}`
//
//  fetch(apiUrl)
//     .then((data) => (data.json()))
//     .then((pokemon) => console.log(pokemon.flavor_text_entries))

//console.log(apiUrl)
