const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class City extends Model { };

City.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  sequelize: db,
  tableName: 'cities',
  modelName: 'City'
});

module.exports = City;