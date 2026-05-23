const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  originalPrice: {
    type: DataTypes.DECIMAL(10, 2)
  },
  rating: {
    type: DataTypes.STRING
  },
  faceitElo: {
    type: DataTypes.STRING
  },
  hours: {
    type: DataTypes.STRING
  },
  matches: {
    type: DataTypes.STRING
  },
  level: {
    type: DataTypes.STRING
  },
  variant: {
    type: DataTypes.ENUM('standard', 'premium', 'compact'),
    defaultValue: 'standard'
  },
  status: {
    type: DataTypes.ENUM('available', 'sold'),
    defaultValue: 'available'
  },
  imageUrl: {
    type: DataTypes.STRING
  }
});

module.exports = Account;