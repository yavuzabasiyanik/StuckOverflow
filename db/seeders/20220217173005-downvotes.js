'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Downvotes', [
      {
        userId: 8,
        answerId: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 6,
        answerId: 51,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: 7,
        answerId: 37,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: 8,
        answerId: 36,
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
    return queryInterface.bulkDelete('Downvotes', null, {});
  }
};
