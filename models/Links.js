'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define('Link', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: 'true'
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    },
  }, {
    timestamps: false
  }, {});
  Link.associate = function(models) {
    // associations can be defined here
  };
  return Link;
};