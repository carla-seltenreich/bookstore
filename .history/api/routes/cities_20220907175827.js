const router = require('express').Router();
const CityModel = require('../models/City');
const citiesController = require('../controllers/CitiesController');

const validateBookId = async (req, res, next) => {
  const book = await BookModel.findByPk(req.params.bookId);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  next();
}

router.get('/books', booksController.index);

router.post('/books', booksController.create);

router.get('/books/:bookId', validateBookId, booksController.show);

router.put('/books/:bookId', validateBookId, booksController.update);

router.delete('/books/:bookId', validateBookId, booksController.delete);

module.exports = router;