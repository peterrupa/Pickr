module.exports = {
  up: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Students', [
        {
            id: 1,
            ClassId: 1,
            fname: "Peter Bernard",
            lname: "Rupa",
            mname: "Mariano",
            image: null,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            ClassId: 1,
            fname: "Narom",
            lname: "Santos",
            mname: "Pineda",
            image: null,
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
    
    return queryInterface.bulkDelete('Students', null, {});
  }
};
