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
    .withMessage('Please enter a Username'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a Password'),
];



/* GET log in. */
router.get('/', csrfProtection, (req, res) => {
  console.log("made it to login", res.locals.authenticated)
  res.render('index', {
    title: 'Log in',
    csrfToken: req.csrfToken(),
  });
});

router.get('/logout', (req, res) => {
  delete req.session.auth;
  console.log("in logout router", req.session.auth)
  // res.redirect('/users')
  req.session.save(() => {
    res.redirect('/')
  })
})


router.post('/', csrfProtection, loginValidators, asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  const validatorErrors = validationResult(req);

  let errors = [];

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

        req.session.save(() => {
          res.redirect('/questions')
        })
      } else {
        let errors = ['Wrong Password']
        res.render ('index', {
          title: 'Login',
          userName,
          errors,
          csrfToken: req.csrfToken(),
        });
      }
    } else {
      let errors = ['Username not found']
      res.render ('index', {
        title: 'Login',
        userName,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
    //Otherwise display error
  } else {
    errors.push('Login failed for the provided username and password');
    errors = validatorErrors.array().map((error) => error.msg);

    res.render('index', {
      title: 'Login',
      userName,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));


module.exports = router;
