var express = require('express');
var router = express.Router();
var Person = require('../models/person');
var ObjectId = require('mongodb').ObjectID;

router.get('/get', (req, res, next) => {
		var cursor = Person.find((err, docs) => {
			var productChunks = [];
			var chunkSize =  1;
			for(var i = 0; i < docs.length ; i += chunkSize){
				productChunks.push(docs.slice(i, i + chunkSize));
			}
			res.render('index', { info: productChunks });
		});
});

router.post('/post', (req, res, next) => {
	var name= req.body.name;
	var age= req.body.age;
	var gender= req.body.option;
	var mobile= req.body.mobile;
	var person = new Person({
		Name: name,
		Age: age,
		Gender: gender,
		Mobile_Number: mobile
	});
	person.save((err, docs) => {
		if(err){
			res.json({ Error: err });
		}
		else{
		res.redirect('/person/get');
		}
	});
});

router.post('/put', (req, res, next) => {
	var id= req.body.id;
	var name= req.body.name;
	var age= req.body.age;
	var gender= req.body.option1;
	var mobile= req.body.mobile;
	var newvalues = { $set: {Name: name, Age: age, Gender: gender,  Mobile_Number: mobile } };
	Person.updateOne({_id: id}, newvalues , (err, doc) => {
		if(err){
			console.log(err);
		}
		else{
			console.log("Updated");	
		}
	});
	res.redirect('/person/get');
});

router.get('/delete/:id', (req, res, next) => {
	var id= req.params.id;
	Person.remove({ _id: id }, (err, docs) => {
		if(err){
			return  err;
		}
		else{
			console.log("Deleted");		
		}
	});
	res.redirect('/person/get');
});

router.get('/edit/:id', function(req, res, next){
	var id = req.params.id;
	var productChunks = [];
	Person.findOne({_id: id}, (err, docs) => {
		console.log(docs);
		productChunks.push(docs);
	});
	res.redirect('/person/get');
});



module.exports = router;
