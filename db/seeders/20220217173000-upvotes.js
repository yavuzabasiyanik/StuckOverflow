'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Upvotes', [
      {
        userId: 5,
        answerId: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        answerId: 51,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: 3,
        answerId: 49,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: 5,
        answerId: 48,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Upvotes', null, {});
  }
};
