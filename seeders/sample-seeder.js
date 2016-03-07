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
    
    return queryInterface.bulkInsert('Samples', [
        {
            title: 'this is a test title',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'looking awesome so far',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'yeah',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'lol',
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
    
    return queryInterface.bulkDelete('Samples', null, {});
  }
};
