const { Op, QueryTypes } = require('sequelize');
const CityModel = require('../models/City');
const StateModel = require('../models/State');
const db = require('../db');

class CitiesController {

  index = async (req, res, next) => {
    // const cities = await db.query('SELECT cities.id, cities.name, states.name AS "State" FROM cities, states WHERE states.id = cities.state_id', { type: QueryTypes.SELECT });

    // const cities = await CityModel.findAll({
    //   include: [{
    //     model: StateModel,
    //     required: false,
    //     attributes: ['name', 'uf']
    //   }]
    // });

    res.json(cities);
  }


}

module.exports = new CitiesController();