'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [
      {
        id: 1, firstName: 'Daniel', lastName: 'Blanco', email: 'db@d-blanco.com', userName: 'dangui', profileUrl: null, hashedPassword: 'password', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        id: 2, firstName: 'Yavuz', lastName: 'Abasiyanik', email: 'abasiyanikyavuz@gmail.com', userName: 'username', profileUrl: null, hashedPassword: 'password', createdAt: new Date(), updatedAt: new Date(),
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
