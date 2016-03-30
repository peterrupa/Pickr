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
            activityId: uuid.v4(),
            activityName: "March 30 2016 Session",
            activityDesc: "",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            activityId: uuid.v4(),
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
