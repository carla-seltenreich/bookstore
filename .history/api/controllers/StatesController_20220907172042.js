const { Op, QueryTypes } = require('sequelize');
const StateModel = require('../models/State');

class StatesController {

  index = async (req, res, next) => {

    const state = await StateModel.findAll({
      include: [{
        model: CityModel,
        required: false,
        attributes: ['name']
      }]
    });

    res.json(state);
  }


}

module.exports = new StatesController();