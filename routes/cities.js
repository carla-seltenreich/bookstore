const router = require('express').Router();
const CityModel = require('../models/City');
const citiesController = require('../controllers/CitiesController');

const validateCityId = async (req, res, next) => {
  const city = await CityModel.findByPk(req.params.cityId);
  if (!city) {
    return res.status(404).json({ error: 'City not found' });
  }
  next();
}

router.get('/cities', validateCityId, citiesController.index);

module.exports = router;