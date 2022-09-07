const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const State = require('./State');

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
  },
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  sequelize: db,
  tableName: 'cities',
  modelName: 'City'
});

City.belongsTo(State, { as: 'state' })

module.exports = City;