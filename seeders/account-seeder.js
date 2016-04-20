module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Accounts', [
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
            password: 'secretsecret',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            fname: 'John Richard',
            mi: 'L',
            lname: 'Pitargue',
            username: 'matigas',
            emailAddress: 'jrlpitargue@gmail.com',
            password: 'matigasnasecret',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            fname: 'TestFirst1',
            mi: 'T',
            lname: 'TestLast1',
            username: 'testy',
            emailAddress: 'testy@test.com',
            password: 'testynasecret',
            createdAt: new Date(),
            updatedAt: new Date()
        }
      ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Accounts', null, {});
  }
};
