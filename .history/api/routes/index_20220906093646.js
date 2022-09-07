const cors = require('cors');
const router = require('express').Router();
const users = require('./users');
const categories = require('./categories');
const books = require('./books')

router.use(cors());

router.use(users);
router.use(categories);
router.use(books);

module.exports = router;