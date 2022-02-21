'use strict';

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const randomIndex = num => Math.floor(Math.random() * Math.floor(num));

module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoUser = {
      firstName: 'Alec',
      lastName: 'Demo',
      email: 'demo@gmail.com',
      userName: 'sifuhotman',
      profileUrl: null,
      hashedPassword: '$2a$12$b56Z0fkkc5xeK6jbRFmQquYBG5hnc0ih/BCbblr7Exx/wxdp0N7ui',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let danielUser = {
      firstName: 'Daniel',
      lastName: 'Blanco',
      email: 'test_db@test.com',
      userName: 'db',
      profileUrl: 'https://ca.slack-edge.com/T03GU501J-U02GGQM0NQ1-e1233ba490b7-512',
      hashedPassword: bcrypt.hashSync('Test1234!'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let yavuzUser = {
      firstName: 'Yavuz',
      lastName: 'Abasiyanik',
      email: 'test_ya@test.com',
      userName: 'ya',
      profileUrl: 'https://ca.slack-edge.com/T03GU501J-U02GQ7RLNBD-75092d8da893-512',
      hashedPassword: bcrypt.hashSync('Test1234!'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let johnnyUser = {
      firstName: 'Johnny',
      lastName: 'San',
      email: 'test_js@test.com',
      userName: 'js',
      profileUrl: 'https://ca.slack-edge.com/T03GU501J-U02L4RJ63PG-e9fa97bc8425-512',
      hashedPassword: bcrypt.hashSync('Test1234!'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let matthewUser = {
      firstName: 'Matthew',
      lastName: 'Puerta',
      email: 'test_mp@test.com',
      userName: 'mp',
      profileUrl: 'https://avatars.githubusercontent.com/u/88907111?v=4',
      hashedPassword: bcrypt.hashSync('Test1234!'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let usersArr = [demoUser, danielUser, yavuzUser, johnnyUser, matthewUser];

    let profilesImages = [
      '', '',
      faker.image.avatar(),
      faker.image.avatar(),
      faker.image.avatar(),
      faker.image.avatar()
    ];

    let i = 0;
    while (i < 20) {
      const user = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        userName: faker.internet.userName(),
        profileUrl: profilesImages[randomIndex(5)],
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
