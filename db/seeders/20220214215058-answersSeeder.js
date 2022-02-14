'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Answers', [
      {
        id: 1, message: 'test answer', answerImg1: null, answerImg2: null, answerImg3: null, userId: 2, questionId: 1, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        id: 2, message: 'test answer', answerImg1: null, answerImg2: null, answerImg3: null, userId: 1, questionId: 3, createdAt: new Date(), updatedAt: new Date(),
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Answers', null, {});

  }
};
