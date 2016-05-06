module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Accounts', [
        {
            id: 1,
            fname: 'Paul Joshua',
            mi: 'H',
            lname: 'Robles',
            username: 'PJHRobles',
            emailAddress: 'joshuahrobles@gmail.com',
            password: 'efab736a1c16de873818e5819f4dfff0', //ultimatesecret
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            fname: 'Irvin Kean Paulus',
            mi: 'T',
            lname: 'Paderes',
            username: 'keanpaderes',
            emailAddress: 'kean.paderes@gmail.com',
            password: '65b945d71da462a037ea7f8f608961f3', //secretsecret
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            fname: 'John Richard',
            mi: 'L',
            lname: 'Pitargue',
            username: 'matigas',
            emailAddress: 'jrlpitargue@gmail.com',
            password: '8330220b5653ac02673fafa7068ea227', //matigasnasecret
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            fname: 'TestFirst1',
            mi: 'T',
            lname: 'TestLast1',
            username: 'testy',
            emailAddress: 'testy@test.com',
            password: 'da002d74e4fc52689b014a8db9857053', //testynasecret
            createdAt: new Date(),
            updatedAt: new Date()
        }
      ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Accounts', null, {});
  }
};
