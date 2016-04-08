module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Account', [
        {
            fname: 'Paul Joshua',
            mi: 'H',
            lname: 'Robles',
            username: 'PJHRobles',
            emailAddress: 'joshuahrobles@gmail.com',
            password: 'ultimatesecret',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            fname: 'Irvin Kean Paulus',
            mi: 'T',
            lname: 'Paderes',
            username: 'keanpaderes',
            emailAddress: 'kean.paderes@gmail.com',
            password: 'ultimatesecret1',
            createdAt: new Date(),
            updatedAt: new Date()
        }
      ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Account', null, {});
  }
};
