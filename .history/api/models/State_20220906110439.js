const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class User extends Model { };

User.init({
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
  province: {
    type: DataTypes.CHAR,
    allowNull: false
  }
}, {
  timestamps: true,
  sequelize: db,
  tableName: 'users',
  modelName: 'User'
});

module.exports = User;