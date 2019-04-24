'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    address: DataTypes.STRING
  }, {});
  Provider.associate = function(models) {
    // associations can be defined here
  };
  return Provider;
};