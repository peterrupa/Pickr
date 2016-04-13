module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Accounts', [
        {
            id: 1,
            FName: 'Paul Joshua',
            MI: 'H',
            LName: 'Robles',
            Username: 'PJHRobles',
            EmailAddress: 'joshuahrobles@gmail.com',
            Password: 'ultimatesecret',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            FName: 'Irvin Kean Paulus',
            MI: 'T',
            LName: 'Paderes',
            Username: 'keanpaderes',
            EmailAddress: 'kean.paderes@gmail.com',
            Password: 'ultimatesecret1',
            createdAt: new Date(),
            updatedAt: new Date()
        }
      ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Accounts', null, {});
  }
};
