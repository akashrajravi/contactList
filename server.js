var express =require('express');
var port=3000;
var app=express();
var mongojs=require('mongojs');
var db=mongojs('contactlist',['contacts']);
var bodyParser=require('body-parser');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.get('/contacts',function (req,res){
	db.contacts.find(function (err,docs){
		res.json(docs);
	});
});
app.post('/contacts',function (req,res){
	console.log(req.body);
	db.contacts.insert(req.body,function (err,docs){
		res.json(docs);
	});
});
app.delete('/contacts/:id',function (req,res){
		var id=req.params.id;
		console.log(id);
		db.contacts.remove({_id:mongojs.ObjectId(id)},function (err,docs){
			res.json(docs);
		});
});
app.get('/contacts/:id',function (req,res){
	var id=req.params.id;
	console.log(id);
	db.contacts.findOne({_id:mongojs.ObjectId(id)},function (err,docs){
		res.json(docs);
	});
});
app.put('/contacts/:id',function (req,res){
	var id=req.params.id;
	db.contacts.findAndModify({Query: {_id:mongojs.ObjectId(id)},
		update: {$set: {name:req.body.name,email:req.body.email,mob:req.body.mob}},
		new: true},function (err,docs){
			res.json(docs);
		}
	);
});
app.listen(port);
console.log('listening at '+port);
