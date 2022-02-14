'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Questions', [
      {
        id: 1, title: 'test', questionImg1: null, questionImg2: null, questionImg3: null, message: 'this is a test', userId: 1, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        id: 2, title: 'test2', questionImg1: null, questionImg2: null, questionImg3: null, message: 'this is a test2', userId: 1, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        id: 3, title: 'test3', questionImg1: null, questionImg2: null, questionImg3: null, message: 'this is a test', userId: 2, createdAt: new Date(), updatedAt: new Date(),
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Questions', null, {});

  }
};
