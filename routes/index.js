var express = require('express');
var router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils');
const db = require("../db/models");
const { loginUser, logoutUser } = require('../auth');
const { check, validationResult } = require('express-validator');

const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please enter an Email Address'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a Password'),
];



/* GET log in. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Log in' });
});

router.post('/', csrfProtection, loginValidators, asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const user = await db.User.findOne({
      where: {
        userName
      }
    });
    console.log(user);
    if (user) {
      const isPassword = await bcrypt.compare(password, user.hashedPassword.toString());
      if (isPassword) {
        loginUser(req, res, user);
        return res.redirect('/');
      }
    }
    //Otherwise display error
    errors.push('Login failed for the provided username and password');
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }

  res.render('/', {
    title: 'Login',
    emailAddress,
    errors,
    csrfToken: req.csrfToken(),
  });
}));


module.exports = router;
