const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class Category extends Model { };

Category.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'categories',
  modelName: 'Category'
});

Categories.associate = (models) => {
  Categories.hasMany(models.Books,
    { foreignKey: 'categories_id', as: 'books' });
};

return Categories;

module.exports = Category;