var express = require('express');
var router = express.Router();
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const bcrypt = require('bcryptjs');
const { loginUser, logoutUser } = require('../auth');


router.get('/', asyncHandler(async (req, res) => {
    const questions = await db.Question.findAll({
        include: [db.Answer, db.User],
        order: [['updatedAt', 'DESC']]
    });
    // console.log('QQQQQQQQQQQQQQQ', questions);
    res.render('questions', { questions, title: 'questions' });
}));

router.get('/ask', asyncHandler(async(req, res) => {
    res.render('create-question', {
        title: 'Create a Question',
    });
}));


module.exports = router;
