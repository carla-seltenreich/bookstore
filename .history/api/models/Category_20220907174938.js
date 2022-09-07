const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const Book = require('./Book');

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

Category.hasMany(Book);
Book.belongsTo(Category, {
  foreignKey: "Categories_id"  
})

module.exports = Category;