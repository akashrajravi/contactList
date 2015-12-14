var express =require('express');
var port=3000;
var app=express();
var mongojs=require('mongojs');
var db=mongojs('contactlist',['contacts']);

app.use(express.static(__dirname+'/public'));
app.get('/contacts',function (req,res){
	db.contactlist.find(function (err,docs){
		res.json(docs);
	});
});
app.listen(port);
console.log('listening at '+port);
