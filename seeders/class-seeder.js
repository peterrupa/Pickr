const uuid = require('node-uuid');

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Classes', [
        {
            classCode: uuid.v4(),
            className: "CMSC 100",
            classDesc: "Web Programming",
            AccountId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            classCode: uuid.v4(),
            className: "CMSC 132",
            classDesc: "Computer Architecture",
            AccountId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }
      ], {});
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
