'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    address: DataTypes.STRING
  }, {});
  Provider.associate = function(models) {
    // associations can be defined here
    // Provider.hasMany(models.ServiceRecord, {
    //   foreignKey : 'providerId'
    // })
    // Provider.belongsTo(models.Category, {
    //   foreignKey : 'providerId'
    // })
  };
  return Provider;
};