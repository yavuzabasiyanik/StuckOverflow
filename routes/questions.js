var express = require('express');
var router = express.Router();
const db = require('../db/models');
const {check, validationResult} = require('express-validator');
const {asyncHandler, csrfProtection} = require('./utils');
const bcrypt = require('bcryptjs');
const {loginUser,logoutUser} = require('../auth');


router.get('/', (req,res)=>{
    console.log('somethingsomething222');
    res.send('Welcome to question page!!!');
})


module.exports = router;
