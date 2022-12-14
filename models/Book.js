const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const Publisher = require('./Publisher');
const Format = require('./Format');
const Category = require('./Category');

class Book extends Model { };

Book.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publication_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pages: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'books',
  modelName: 'Book'
});

Publisher.hasMany(Book);
Book.belongsTo(Publisher);


Format.hasMany(Book);
Book.belongsTo(Format);

Category.hasMany(Book);
Book.belongsTo(Category);

module.exports = Book;