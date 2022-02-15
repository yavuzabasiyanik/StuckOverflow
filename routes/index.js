var express = require('express');
var router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils');
const db = require("../db/models");
const { loginUser, logoutUser } = require('../auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const loginValidators = [
  check('userName')
    .exists({ checkFalsy: true })
    .withMessage('Please enter an Email Address'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a Password'),
];



/* GET log in. */
router.get('/',csrfProtection, (req, res) => {
  res.render('index', {
    title: 'Log in',
    csrfToken:req.csrfToken(),
  });
});

router.post('/', csrfProtection, loginValidators, asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  const validatorErrors = validationResult(req);

  console.log(req.body);
  if (validatorErrors.isEmpty()) {
    const user = await db.User.findOne({
      where: {
        userName
      }
    });

    if (user) {
      const isPassword = await bcrypt.compare(password, user.hashedPassword.toString());
      if (isPassword) {
        loginUser(req, res, user);
        res.redirect('/questions');
      }
    }
    //Otherwise display error
    errors.push('Login failed for the provided username and password');
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }

  res.render('index', {
    title: 'Login',
    userName,
    errors,
    csrfToken: req.csrfToken(),
  });
}));


module.exports = router;
