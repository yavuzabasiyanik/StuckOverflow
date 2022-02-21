'use strict';

const { faker } = require('@faker-js/faker');

const randomNum = num => Math.floor(Math.random() * Math.floor(num) + 1);
const randomIndex = num => Math.floor(Math.random() * Math.floor(num));

module.exports = {
  up: (queryInterface, Sequelize) => {

    let answersArr = [];

    let answersImages = [
      '', '', '', '', '', '',
      faker.image.image(), faker.image.image(), faker.image.image(),
      faker.image.image(), faker.image.image(), faker.image.image(),
      faker.image.image(), faker.image.image(), faker.image.image(),
      faker.image.image(), faker.image.image(), faker.image.image(),
      faker.image.image(), faker.image.image(), faker.image.image(),
    ];

    let i = 0;
    while (i < 75) {
      const answer = {
        message: faker.lorem.paragraphs(),
        answerImg1: answersImages[randomIndex(20)],
        answerImg2: answersImages[randomIndex(20)],
        answerImg3: answersImages[randomIndex(20)],
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
