const cors = require('cors');
const router = require('express').Router();
const users = require('./users');
const categories = require('./categories');
const publishers = require('./publishers');
const formats = require('./formats');
const books = require('./books');
const cities = require('./cities');
const states = require('./states');
const address = require('./address');

router.use(cors());

router.use(users);
router.use(categories);
router.use(publishers);
router.use(formats);
router.use(books);
router.use(cities);
router.use(states);
router.use(address);

module.exports = router;