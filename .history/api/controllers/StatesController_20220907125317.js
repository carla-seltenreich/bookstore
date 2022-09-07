const { Op, QueryTypes } = require('sequelize');
const StateModel = require('../models/State');
const db = require('../db');

class StatesController {

  index = async (req, res, next) => {
    // const state = await db.query('SELECT state.id, state.name, , { type: QueryTypes.SELECT });

    // const state = await StateModel.findAll({
    //   include: [{
    //     model: CityModel,
    //     required: false,
    //     attributes: ['name']
    //   }]
    // });

    res.json(states);
  }


}

module.exports = new StatesController();