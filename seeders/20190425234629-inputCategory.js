'use strict';
const fs = require('fs')
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const data = JSON.parse(fs.readFileSync('./category.json', 'utf8'))
    for (let i = 0; i < data.length; i++){
      data[i].createdAt = new Date
      data[i].updatedAt = new Date
    }
    return queryInterface.bulkInsert("Categories", data)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Categories", null, {})
  }
};
