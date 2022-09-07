const { Op, QueryTypes } = require('sequelize');
const StateModel = require('../models/State');
const db = require('../db');

class StatesController {

  index = async (req, res, next) => {
    // const state = await db.query('SELECT state.id, state.name, , { type: QueryTypes.SELECT });

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