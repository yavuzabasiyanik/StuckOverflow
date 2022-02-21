'use strict';

const { faker } = require('@faker-js/faker');

const randomNum = num => Math.floor(Math.random() * Math.floor(num) + 1);
const randomIndex = num => Math.floor(Math.random() * Math.floor(num));

module.exports = {
  up: (queryInterface, Sequelize) => {

    let questionsArr = [];

    let questionsImages = [
      '', '', '', '', '', '',
      faker.image.image(), faker.image.image(), faker.image.image(),
      faker.image.image(), faker.image.image(), faker.image.image(),
      faker.image.image(), faker.image.image(), faker.image.image(),
      faker.image.image(), faker.image.image(), faker.image.image(),
      faker.image.image(), faker.image.image(), faker.image.image(),
    ];

    let i = 0;
    while (i < 25) {
      const question = {
        title: faker.lorem.sentence(),
        questionImg1: questionsImages[randomIndex(20)],
        questionImg2: questionsImages[randomIndex(20)],
        questionImg3: questionsImages[randomIndex(20)],
        message: faker.lorem.paragraphs(),
        userId: randomNum(20),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };
      questionsArr.push(question);
      i++;
    }

    return queryInterface.bulkInsert('Questions', questionsArr, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
