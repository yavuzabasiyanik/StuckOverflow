'use strict';

const { faker } = require('@faker-js/faker');

const randomNum = num => Math.floor(Math.random() * Math.floor(num) + 1);

module.exports = {
  up: (queryInterface, Sequelize) => {

    let answersArr = [];

    let i = 0;
    while (i < 75) {
      const answer = {
        message: faker.lorem.paragraphs(),
        answerImg1: faker.image.image(),
        answerImg2: faker.image.image(),
        answerImg3: faker.image.image(),
        userId: randomNum(10),
        questionId: randomNum(20),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };
      answersArr.push(answer);
      i++;
    }

    return queryInterface.bulkInsert('Answers', answersArr, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Answers', null, {});
  }
};
