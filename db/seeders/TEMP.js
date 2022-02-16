'use strict';

const faker = require('faker');
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
        while (i < 100) {
            const user = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                username: faker.internet.userName(),
                profileUrl: faker.image.avatar(),
                hashedPassword: bcrypt.hashSync(faker.internet.password()),
                createdAt: faker.date.past(),
                udpdatedAt: faker.date.recent(),
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Users', [
            {
                id: 1, firstName: 'Demo', lastName: 'demo', email: 'demo@gmail.com', userName: 'sifuhotman', profileUrl: null, hashedPassword: '$2a$12$b56Z0fkkc5xeK6jbRFmQquYBG5hnc0ih/BCbblr7Exx/wxdp0N7ui', createdAt: new Date(), updatedAt: new Date(),
            },
            {
                id: 2, firstName: 'Daniel', lastName: 'Blanco', email: 'db@d-blanco.com', userName: 'dangui', profileUrl: null, hashedPassword: 'password', createdAt: new Date(), updatedAt: new Date(),
            },
            {
                id: 3, firstName: 'Yavuz', lastName: 'Abasiyanik', email: 'abasiyanikyavuz@gmail.com', userName: 'username', profileUrl: null, hashedPassword: 'password', createdAt: new Date(), updatedAt: new Date(),
            }
        ], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('Users', null, {});

    }
};
