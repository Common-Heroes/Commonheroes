'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([ 
      queryInterface.removeColumn("ServiceRecords", "checkin"), queryInterface.removeColumn("ServiceRecords", "checkout"),
      queryInterface.addColumn("ServiceRecords", "checkIn", Sequelize.STRING),
      queryInterface.addColumn("ServiceRecords", "checkOut", Sequelize.STRING)
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return Promise.all([ 
    queryInterface.addColumn("ServiceRecords", "checkin", Sequelize.DATE), queryInterface.addColumn("ServiceRecords", "checkout", Sequelize.DATE),
    queryInterface.removeColumn("ServiceRecords", "checkIn"),
    queryInterface.removeColumn("ServiceRecords", "checkOut")
  ])
  }
};
