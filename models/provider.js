'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    address: DataTypes.STRING,
    CategoryId : DataTypes.INTEGER
  }, {});
  Provider.associate = function(models) {
    // associations can be defined here
    Provider.hasMany(models.ServiceRecord)
    Provider.belongsTo(models.Category)
  };
  return Provider;
};