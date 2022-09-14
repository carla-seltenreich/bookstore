const CityModel = require('../models/City');
const StateModel = require('../models/State');

class StatesController {

  index = async (req, res, next) => {
      //encontra todos os estados
    const state = await StateModel.findAll();
    
    res.json(state);
  }

  cities = async (req, res, next) => {
    //percorre todos os estados e inclue as cidades referentes a ele
    const state = await StateModel.findByPk(req.params.stateId, {
      include: [{
        model: CityModel,
        required: false,
        attributes: ['id', 'name']
      }]
    });

    res.json(state);
  }


}

module.exports = new StatesController();