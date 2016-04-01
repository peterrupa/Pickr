const uuid = require('node-uuid');

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Students', [
        {
            studentId: uuid.v4(),
            fname: "Peter Bernard",
            lname: "Rupa",
            mname: "Mariano",
            image: "/img/test.jpg",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            studentId: uuid.v4(),
            fname: "Narom",
            lname: "Santos",
            mname: "Pineda",
            image: "/img/test.jpg",
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
