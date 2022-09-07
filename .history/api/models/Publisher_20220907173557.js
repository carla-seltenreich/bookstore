const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const City = require('./City');

class Publisher extends Model { };

Publisher.init({
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
  tableName: 'publishers',
  modelName: 'Publisher'
});

City.hasMany(Publisher)
State.hasMany(City);
City.belongsTo(State);

module.exports = Publisher;