const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class State extends Model { };

State.init({
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
  uf: {
    type: DataTypes.CHAR,
    allowNull: false
  }
}, {
  timestamps: true,
  sequelize: db,
  tableName: 'states',
  modelName: 'State'
});

module.exports = State;