var express = require('express');
var router = express.Router();
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const bcrypt = require('bcryptjs');
const { loginUser, logoutUser, requireAuth } = require('../auth');


router.get('/', csrfProtection, asyncHandler(async (req, res) => {
    const params = req.body;

    console.log(params);
    res.send(params);
}));

module.exports= router;