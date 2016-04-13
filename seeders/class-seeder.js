const uuid = require('node-uuid');

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Classes', [
        {
            id: 1,
            AccountId: 1,
            className: "CMSC 100",
            // classDesc: "Web Programming",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            AccountId: 1,
            className: "CMSC 132",
            // classDesc: "Computer Architecture",
            createdAt: new Date(),
            updatedAt: new Date()
        }
      ], {});
    return;
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    
    return queryInterface.bulkDelete('Classes', null, {});
  }
};
