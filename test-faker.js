const { faker } = require('@faker-js/faker');

const randomNum = num => Math.floor(Math.random() * Math.floor(num) + 1);

// console.log(randomNum(25));

const seedUser = num => {

    let questionsArr = [];

    let i = 1;
    while (i < 5) {
        const question = {
            title: faker.lorem.sentence(),
            questionImg1: faker.image.image(),
            questionImg2: faker.image.image(),
            questionImg3: faker.image.image(),
            message: faker.lorem.paragraphs(),
            userId: randomNum(25),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
        };
        questionsArr.push(question);
        i++;
    }

    console.log(questionsArr);
};

seedUser();
