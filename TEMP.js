// U S E R   S E E D E R

// 'use strict';

// module.exports = {
//     up: (queryInterface, Sequelize) => {

//         return queryInterface.bulkInsert('Users', [
//             {
//                 id: 1, firstName: 'Demo', lastName: 'demo', email: 'demo@gmail.com', userName: 'sifuhotman', profileUrl: null, hashedPassword: '$2a$12$b56Z0fkkc5xeK6jbRFmQquYBG5hnc0ih/BCbblr7Exx/wxdp0N7ui', createdAt: new Date(), updatedAt: new Date(),
//             },
//             {
//                 id: 2, firstName: 'Daniel', lastName: 'Blanco', email: 'db@d-blanco.com', userName: 'dangui', profileUrl: null, hashedPassword: 'password', createdAt: new Date(), updatedAt: new Date(),
//             },
//             {
//                 id: 3, firstName: 'Yavuz', lastName: 'Abasiyanik', email: 'abasiyanikyavuz@gmail.com', userName: 'username', profileUrl: null, hashedPassword: 'password', createdAt: new Date(), updatedAt: new Date(),
//             }
//         ], {});

//     },

//     down: (queryInterface, Sequelize) => {

//         return queryInterface.bulkDelete('Users', null, {});

//     }
// };


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  Q U E S T I O N S   S E E D E R

// 'use strict';

// module.exports = {
//     up: (queryInterface, Sequelize) => {

//         return queryInterface.bulkInsert('Questions', [
//             {
//                 id: 1, title: 'test', questionImg1: null, questionImg2: null, questionImg3: null, message: 'this is a test', userId: 1, createdAt: new Date(), updatedAt: new Date(),
//             },
//             {
//                 id: 2, title: 'test2', questionImg1: null, questionImg2: null, questionImg3: null, message: 'this is a test2', userId: 1, createdAt: new Date(), updatedAt: new Date(),
//             },
//             {
//                 id: 3, title: 'test3', questionImg1: null, questionImg2: null, questionImg3: null, message: 'this is a test', userId: 2, createdAt: new Date(), updatedAt: new Date(),
//             },
//         ], {});
//     },

//     down: (queryInterface, Sequelize) => {

//         return queryInterface.bulkDelete('Questions', null, {});
//     }
// };


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  A N S W E R S   S E E D E R


// 'use strict';

// module.exports = {
//     up: (queryInterface, Sequelize) => {

//         return queryInterface.bulkInsert('Answers', [
//             {
//                 id: 1, message: 'test answer', answerImg1: null, answerImg2: null, answerImg3: null, userId: 2, questionId: 1, createdAt: new Date(), updatedAt: new Date(),
//             },
//             {
//                 id: 2, message: 'test answer', answerImg1: null, answerImg2: null, answerImg3: null, userId: 1, questionId: 3, createdAt: new Date(), updatedAt: new Date(),
//             },
//         ], {});

//     },

//     down: (queryInterface, Sequelize) => {

//         return queryInterface.bulkDelete('Answers', null, {});

//     }
// };
