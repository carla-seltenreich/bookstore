const router = require('express').Router();
const StateModel = require('../models/State');
const statesController = require('../controllers/StatesController');

const validateStateId = async (req, res, next) => {
  const state = await StateModel.findByPk(req.params.stateId);
  if (!state) {
    return res.status(404).json({ error: 'State not found' });
  }
  next();
}

router.get('/states', validateCityId, statesController.index);

module.exports = router;