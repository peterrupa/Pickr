module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Accounts', [
        {
            id: 1,
            username: 'PJHRobles',
            emailAddress: 'joshuahrobles@gmail.com',
            password: 'efab736a1c16de873818e5819f4dfff0', //ultimatesecret
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            username: 'keanpaderes',
            emailAddress: 'kean.paderes@gmail.com',
            password: '65b945d71da462a037ea7f8f608961f3', //secretsecret
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            username: 'matigas',
            emailAddress: 'jrlpitargue@gmail.com',
            password: '8330220b5653ac02673fafa7068ea227', //matigasnasecret
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            id: 4,
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
