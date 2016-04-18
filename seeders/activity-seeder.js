const uuid = require('node-uuid');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    
    return queryInterface.bulkInsert('Activities', [
        {
            id: 1,
            ClassId: 1,
            activityName: "March 30 2016 Session",
            activityDesc: "",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            ClassId: 1,
            activityName: "April Fools",
            activityDesc: "",
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
    
    return queryInterface.bulkDelete('Activities', null, {});
  }
};
