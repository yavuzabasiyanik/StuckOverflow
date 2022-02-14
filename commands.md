//create database user


create user stuck_app with password 'imstuckpleasehelp' createdb login;


npx dotenv sequelize db:create

//models

npx dotenv sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string,userName:string,profileUrl:string,hashedPassword:string

npx dotenv sequelize model:generate --name Question --attributes title:string,questionImg1:string,questionImg2:string,questionImg3:string,message:text,userId:integer

npx dotenv sequelize model:generate --name Answer --attributes message:text,answerImg1:string,answerImg2:string,answerImg3:string,userId:integer,questionId:integer

npx dotenv sequelize model:generate --name Upvote --attributes userId:integer,answerId:integer

npx dotenv sequelize model:generate --name Downvote --attributes userId:integer,answerId:integer

//seeders

//users
{
  id: 1, firstName: 'Daniel', lastName: 'Blanco', email: 'db@d-blanco.com', userName:'dangui', profileUrl:null, password: 'password',
},
{
  id: 2, firstName: 'Yavuz', lastName: 'Abasiyanik', email: 'abasiyanikyavuz@gmail.com', userName:'username', profileUrl:null, password: 'password',
}

//questions
{
  id: 1, title: 'test', questionImg1: null, questionImg2: null, questionImg3: null, message: 'this is a test', userId: 1
},
{
  id: 2, title: 'test2', questionImg1: null, questionImg2: null, questionImg3: null, message: 'this is a test2', userId: 1
},
{
  id: 3, title: 'test3', questionImg1: null, questionImg2: null, questionImg3: null, message: 'this is a test', userId: 2
},


//answer
{
  id: 1, message: 'test answer', answerImg1: null, answerImg2: null, answerImg3: null, userId: 2, questionId: 1
},
{
  id: 2, message: 'test answer', answerImg1: null, answerImg2: null, answerImg3: null, userId: 1, questionId: 3
},
