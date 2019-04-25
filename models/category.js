'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    providerId: DataTypes.INTEGER
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Provider, {
      foreignKey : 'providerId'
    })
  };
  return Category;
};