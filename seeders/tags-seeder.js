module.exports = {
  up: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Tags', [
        {
            id: 1,
            name: 'AB-3L',
            StudentId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            name: 'Pogi',
            StudentId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            name: 'Handsome',
            StudentId: 2,
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
    
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
