'use strict';

const { faker } = require('@faker-js/faker');

const randomNum = num => Math.floor(Math.random() * Math.floor(num) + 1);

module.exports = {
  up: (queryInterface, Sequelize) => {

    let questionsArr = [];

    let i = 0;
    while (i < 25) {
      const question = {
        title: faker.lorem.sentence(),
        questionImg1: faker.image.image(),
        questionImg2: faker.image.image(),
        questionImg3: faker.image.image(),
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
