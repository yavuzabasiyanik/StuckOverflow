var express = require('express');
var router = express.Router();

const db = require("../db/models");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

module.exports = router;
