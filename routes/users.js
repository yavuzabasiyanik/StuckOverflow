var express = require('express');
var router = express.Router();
const db = require('../db/models');
const {check, validationResult} = require('express-validator');
const {asyncHandler, csrfProtection} = require('./utils');
const bcrypt = require('bcryptjs');
const {loginUser,logoutUser} = require('../auth');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/signup',csrfProtection, (req,res)=>{
  const user = db.User.build();

  res.render('signup',{
    title: 'Sign Up',
    user,
    csrfToken: req.csrfToken()
  })
})

const userValidator= [
  check('firstName')
  .exists({ checkFalsy: true })
  .withMessage('Please enter a First Name')
  .isLength({ max: 50 })
  .withMessage('First Name can not be more than 50 characters long'),
check('lastName')
  .exists({ checkFalsy: true })
  .withMessage('Please enter a Last Name')
  .isLength({ max: 50 })
  .withMessage('Last Name can not be more than 50 characters long'),
check('email')
  .exists({ checkFalsy: true })
  .withMessage('Please enter an Email Address')
  .isLength({ max: 255 })
  .withMessage('Email Address can not be more than 255 characters long')
  .isEmail()
  .withMessage('Email Address is not a valid email')
  .custom((value) => {
    return db.User.findOne({ where: { email: value } })
      .then((user) => {
        if (user) {
          return Promise.reject('The provided Email Address is already in use by another account');
        }
      });
  }),
check('username')
  .exists({checkFalsy:true})
  .withMessage('Please enter a username')
  .isLength({ max: 50 })
  .withMessage('Username can not be more than 50 characters long'),
check('password')
  .exists({ checkFalsy: true })
  .withMessage('Please enter a Password')
  .isLength({ max: 50 })
  .withMessage('Password can not be more than 50 characters long')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
  .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
check('confirmPassword')
  .exists({ checkFalsy: true })
  .withMessage('Please enter a Confirm Password')
  .isLength({ max: 50 })
  .withMessage('Confirm Password can not be more than 50 characters long')
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Confirm Password does not match Password');
    }
    return true;
  })
]

router.post('/signup',userValidator,csrfProtection, asyncHandler(async(req,res)=>{
  const {firstName, lastName, email, username, profileUrl, password} = req.body;

  const user = await db.User.build({
    firstName,
    lastName,
    email,
    username,
    profileUrl
  })
  const validatorErr = validationResult(req);

  if(validatorErr.isEmpty()){
    const hashedPassword = await bcrypt.hash(password,12);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser();
    res.redirect('/questions');

  }else{
    const errors = validatorErr.array().map((err)=> err.msg);
    res.render('signup',{
      title: 'Sing Up',
      user,
      errors,
      csrfToken:req.csrfToken()
    })
  }


}));


module.exports = router;
