const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();

function titleCase(str) {
    str = str[0].toUpperCase() + str.substr(1);
    return str;
}

// const fetch = require("node-fetch");

const vowels = 'aeiouAEIOU';

client.once('ready', () => {
console.log('Ready!')
})

// function probability(n) {
//   return Math.random() <= n;
// }

client.on('message', message => {
    if(message.content.startsWith(`${prefix}`) && (!message.author.bot)) {
        // console.log(message.content);

        //kickFunction
        if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {

            if(message.content.startsWith(`${prefix}kick`)) {
                //message.channel.send("No!")

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
                console.log(search)
                if(search.includes("mr mime") || search.includes("mime jr") || search.includes("tapu koko")) {
                    search = search.split(" ")[1] + '-' + search.split(" ")[2];
                } else {
                    search = search.split(" ")[1];
                }
                console.log(search)
                let pokemon = search;
                let Pokedex = require("pokedex-promise-v2");
                let Poke = {};
            Poke["pokedex-promise-v2"] = new Pokedex()
            pokemon = Poke["pokedex-promise-v2"].getPokemonByName(pokemon) // with Promise
            .then(function (response) {
                // console.log(response);
                let pokedata = response;
                //id
                let pokeid = String(pokedata.id);
                console.log(pokeid.length);
                if(pokeid.length < 3) {
                    if(pokeid.length > 1) {pokeid = '0' + pokeid}
                    else(pokeid = '00' + pokeid)
                }
                console.log(pokeid.length);
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
                let pokeEmbed = new Discord.RichEmbed()
                pokeEmbed.setColor('#FF0000')
                pokeEmbed.setTitle(pokename)
                pokeEmbed.addField('Type', type)
                pokeEmbed.setThumbnail('https://www.serebii.net/Shiny/SWSH/' + pokeid + '.png')
                pokeEmbed.setImage('https://www.serebii.net/swordshield/pokemon/' + pokeid + '.png')

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
                message.channel.send(pokeEmbed);
            })

            .catch(function (error) {
                 message.channel.send("That's not a Pokémon!");
            });
        }
    }

})

// let str1 = 'ello';
// var vowel_list = 'aeiouAEIOU'
// console.log(vowel_list.indexOf(str1[0]);

// types: [ { slot: 1, type: [Object] } ]



client.login(token);

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
