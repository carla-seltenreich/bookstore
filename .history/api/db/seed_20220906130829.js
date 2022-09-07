const data = require('./data/all-cities.json');
const City = require('../models/City');
const State = require('../models/State');

for (let item of data.estados) {
    let state = State.create({
        name: item.nome,
        uf: item.sigla,
    })
}