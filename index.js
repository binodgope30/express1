var express = require('express');
var path    = require("path");
var bodyParser = require('body-parser');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user:'root',
    password: '',
    database : 'ggps'

});

var app = express();

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");    
    } else {
        console.log("Error connecting database ... nn");
        console.log(err);    
    }
    });

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded


app.get('/', function(req, res){
   res.send("Hello world!");
});
app.get('/home', function(req, res){
   // res.send("Hello world!");
    res.sendFile(path.join(__dirname+'/view1.html'));
 });

 app.post('/register', function(req, res){

    console.log(req.body);
    if(req.body){
        var name = req.body.firstname;
        var email = req.body.email;
        var password = req.body.password;
        var b_day = req.body.b_day;
        var country = req.body.country;
        var sql = "insert into registeration('name','email','password','b_day','country') values ?";
        var valuess = [['rahul','ra@gm.com','12345','1994-05-15','Pak'],
                      ['Akshey','akk@gm.com','123456','1991-05-15','Ind']];
        connection.query(sql,[valuess], function(err, result){
            if(err) throw err;
            console.log("successfully inserted");
        });
        //res.send("thnku");
    }
  });

app.listen(3000);