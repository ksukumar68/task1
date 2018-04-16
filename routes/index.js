var express = require('express');
var router = express.Router();
var Person = require('../models/person');

/* GET home page. */
router.get('/',(req, res, next) => {
//  res.render('index');
 //  Person.find((err, docs) => {
	// 		res.json(docs);
	// });
	res.redirect('/person/get');
});


module.exports = router;
