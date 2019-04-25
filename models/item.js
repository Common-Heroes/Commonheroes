'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.User, {
      foreignKey : "userId"
    })
  };
  return Item;
};