require('dotenv').config({ path: '../.env' });

console.log(process.env.DB_DATABASE)

// const data = require('./data/all-cities.json');
// const City = require('../models/City');
// const State = require('../models/State');

// for (let item of data.estados) {
//     let state = State.create({
//         name: item.nome,
//         uf: item.sigla,
//     });

//     for (let city of item.cidades) {
//         City.create({
//             name: city,
//             state_id: state.id
//         });
//     }
// }