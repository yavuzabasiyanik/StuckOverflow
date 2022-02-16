'use strict';

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoUser = {
      firstName: 'Demo',
      lastName: 'demo',
      email: 'demo@gmail.com',
      userName: 'sifuhotman',
      profileUrl: null,
      hashedPassword: '$2a$12$b56Z0fkkc5xeK6jbRFmQquYBG5hnc0ih/BCbblr7Exx/wxdp0N7ui',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let usersArr = [demoUser];

    let i = 0;
    while (i < 20) {
      const user = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        userName: faker.internet.userName(),
        profileUrl: faker.image.avatar(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };
      usersArr.push(user);
      i++;
    }

    return queryInterface.bulkInsert('Users', usersArr, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
