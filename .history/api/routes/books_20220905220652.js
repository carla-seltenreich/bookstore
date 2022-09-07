const router = require('express').Router();
const BookModel = require('../models/Book');
const booksController = require('../controllers/BooksController');

const validateBookId = async (req, res, next) => {
  const book = await BookModel.findByPk(req.params.bookId);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  next();
}

router.get('/books', booksController.index);

router.post('/books', booksController.create);

router.get('/books/:bookId', validatebookId, booksController.show);

router.put('/books/:bookId', validatebookId, booksController.update);

router.delete('/books/:bookId', validatebookId, booksController.delete);

module.exports = router;