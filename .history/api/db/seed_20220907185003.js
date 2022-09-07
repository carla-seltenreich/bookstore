require('dotenv').config({ path: '../.env' });

const data = require('./data/all-cities.json');
const City = require('../models/City');
const State = require('../models/State');

const seed = async () => {
    for (let item of data.state) {
        let state = await State.create({
            name: item.name,
            province: item.province,
        });
    
        for (let city of item.cities) {
            await City.create({
                name: city,
                state_id: state.id
            });
        }
    }
}

seed();