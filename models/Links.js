'use strict';
module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define('Link', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: 'true'
    },
    url: {
      type: DataTypes.STRING,
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