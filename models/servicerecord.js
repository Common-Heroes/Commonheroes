'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServiceRecord = sequelize.define('ServiceRecord', {
    userId: DataTypes.INTEGER,
    providerId: DataTypes.INTEGER,
    checkin: DataTypes.STRING,
    checkout: DataTypes.STRING
  }, {});
  ServiceRecord.associate = function(models) {
    // associations can be defined here
    ServiceRecord.belongsTo(models.User,{
      foreignKey : 'userId'
    })
    ServiceRecord.belongsTo(models.Provider)
  };
  return ServiceRecord;
};