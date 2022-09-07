const CityModel = require('../models/City');
const StateModel = require('../models/State');

class CitiesController {

  index = async (req, res, next) => {

    const cities = await CityModel.findAll({
      include: [{
        model: StateModel,
        required: false,
        attributes: ['name', 'province']
      }]
    });

    res.json(cities);
  }


}

module.exports = new CitiesController();