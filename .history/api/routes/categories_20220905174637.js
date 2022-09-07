const router = require('express').Router();
const CategoryModel = require('../models/Category');
const categoriesController = require('../controllers/CategoriesController');

const validateCategoryId = async (req, res, next) => {
  const category = await CategoryModel.findByPk(req.params.categoryId);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  next();
}

router.get('/users', usersController.index);

router.post('/users', usersController.create);

router.get('/users/:userId', validateUserId, usersController.show);

router.put('/users/:userId', validateUserId, usersController.update);

router.delete('/users/:userId', validateUserId, usersController.delete);

module.exports = router;