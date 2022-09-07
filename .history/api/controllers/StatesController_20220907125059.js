const { Op, QueryTypes } = require('sequelize');
const StateModel = require('../models/State');
const db = require('../db');

class StatesController {

  index = async (req, res, next) => {
    const state = await db.query('SELECT state.id, state.name, states.uf AS "State" FROM cities, states WHERE states.id = cities.state_id', { type: QueryTypes.SELECT });

    // const cities = await CityModel.findAll({
    //   include: [{
    //     model: StateModel,
    //     required: false,
    //     attributes: ['name', 'province']
    //   }]
    // });

    res.json(states);
  }


}

module.exports = new StatesController();