const router = require('express').Router();
const addressController = require('../controllers/AddressController');

router.get('/address/:cep', addressController.index);

module.exports = router;