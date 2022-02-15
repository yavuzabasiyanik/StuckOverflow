var express = require('express');
var router = express.Router();
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const bcrypt = require('bcryptjs');
const { loginUser, logoutUser } = require('../auth');


router.get('/', asyncHandler(async (req, res) => {
    const questions = await db.Question.findAll({
        include: [db.Answer, db.User]
    });
    console.log('QQQQQQQQQQQQQQQ', questions);
    res.render('questions', { questions, title: 'questions' });
}));


module.exports = router;
