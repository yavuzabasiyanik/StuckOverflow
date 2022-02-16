var express = require('express');
var router = express.Router();
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const bcrypt = require('bcryptjs');
const { loginUser, logoutUser, requireAuth } = require('../auth');

//validators
const questionValidator = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Please enter a Title'),
    check('message')
      .exists({ checkFalsy: true })
      .withMessage('Please enter a Message'),
  ];



//routes

//questions lists
router.get('/', asyncHandler(async (req, res) => {
    const questions = await db.Question.findAll({
        include: [db.Answer, db.User],
        order: [['updatedAt', 'DESC']]
    });
    // console.log('QQQQQQQQQQQQQQQ', questions);
    res.render('questions', { questions, title: 'questions' });
}));


//ask questions
router.get('/ask', requireAuth, csrfProtection, asyncHandler(async(req, res) => {
    res.render('create-question', {
        title: 'Ask a Question',
        csrfToken: req.csrfToken()
    });
}));

router.post('/ask', questionValidator, csrfProtection, asyncHandler(async (req, res) => {
    const {
        title,
        questionImg1,
        questionImg2,
        questionImg3,
        message,
    } = req.body;

    const userId = req.session.auth.userId;

    const question = await db.Question.build({
        title,
        questionImg1,
        questionImg2,
        questionImg3,
        message,
        userId
    });

    const validationErr = validationResult(req);

    if (validationErr.isEmpty()) {
        await question.save();
        res.redirect('/questions')
    } else {
        const errors = validationErr.array().map(err => err.msg);
        res.render('create-question', {
            title: 'Ask a Question',
            errors,
            question,
            csrfToken: req.csrfToken()
        });
    }
}));

//individual questions
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const question = await db.Question.findByPk(id, {
        include: db.User,
    });

    let userId;

    if (req.session.auth) {
        userId = req.session.auth.userId
    }

    res.render('individual-question', {
        title: question.title,
        question,
        userId
    });
}));

//edit question

router.get('/:id(\\d+)/edit', csrfProtection, asyncHandler(async (req, res) => {

}));




module.exports = router;
