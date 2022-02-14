var express = require('express');
var router = express.Router();
const db = require('../db/models');
const {asyncHandler, csrfProtection} = require('./utils');




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



module.exports = router;
