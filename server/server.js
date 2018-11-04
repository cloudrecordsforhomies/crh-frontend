// ============== Imports =============== //
const url = require('url');
const cors = require('cors');
const http = require('http');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
// ====================================== //

var transporter;
// ============== Database ============== //
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'web_client',
  password : 'web_client',
  database : 'cache'
});
// ====================================== //


// ============== Server ================ //
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('PORT', process.env.PORT || 5000);
// ====================================== //

// ========== GET Requests ============== //

app.get('/echo', (req, res) => {
  console.log("echo");
  res.status(200).send('echo');
});

app.get('/users', (req, res) => {
  var sql = `SELECT * FROM User`;
  db.query(sql, function(err, result){
    if(err) throw(err);
    //res.header('Access-Control-Allow-Origin', 'http://192.168.43.224:4350');
    res.status(200).send(result);
  });
});

app.get('/profile/:id', (req, res) => {
  var id = req.params.id;
  var sql = `SELECT * FROM USER WHERE uId=${id}`;
  db.query(sql, function(err,result,fields){
    if(err){
      throw(err);
      res.status(400).send("Could not complete request");
    }
    res.status(200).send(result[0]);
  });



});
app.get('/listings', (req,res) => {

  var uLat = req.query.uLat;
  var uLong = req.query.uLong;
  var uRadius = req.query.uRadius;
  var sql = `SELECT b.bId, b.hostId, b.squareFeet, b.address, b.picture, (3959 * acos( cos( radians(${uLat}) )* cos( radians(b.latitude) )* cos( radians(b.longitude) - radians(${uLong}) )+ sin( radians(${uLat}) )* sin( radians(b.latitude) ) ) ) AS distance_miles FROM UnconfirmedHostSideBooking b GROUP BY b.bId ;`
  console.log(sql);
  db.query(sql, function(err, result) {
    if(err) throw(err);
    console.log(result);
    res.status(200).send(result);
  });

});

// ====================================== //


// ============== POST Requests ================ //

app.post('/api/echo', (req, res) => {
  var payload = JSON.stringify(req.body);
  console.log(`echo: ${payload}`);
  res.status(200).send(payload);
});

app.post('/users/new', (req, res) => {

  var sql = `INSERT INTO User (first, last, email, password, phone, profPic) VALUES (?)`;
  var values = Object.keys(req.body).map(function(_){return req.body[_]});

  db.query(sql, [values], function(err,result,fields){
    if(err){
      throw(err);
      res.status(500).send("User already exists");
    }

  });

  var mailOptions = {
    from: '"Cache Team" <admin@cache370.com>', // sender address
    to: req.body.email, // list of receivers
    subject: 'Welcome!', // Subject line
    text: 'Hey there! Welcome to Cache! We are excited to have you.', // plaintext body
    html: `<b>Hey there, ${req.body.first}! Welcome to Cache! We are excited to have you.</b>` // html body
};

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
  res.status(200).send(req.body);
});

app.post('/users/login', (req, response) => {
  var email = req.body.email;
  var password = req.body.password
  sql = `SELECT uId FROM User WHERE email='${email}' AND password='${password}';`
  db.query(sql, function(err,result,fields){
    if(err){
      throw(err);
      response.status(400).send({id:-1});
    }
    if(result) {
      console.log(result);
      var id = result[0]['uId'];
      response.status(200).send({id:id});
    } else {
      response.status(400).send({id:-1});
    }
  });
});

app.post('/booking/new', (req, res) => {

  console.log(req.body);
  req = req.body;
  var sql = `INSERT INTO UnconfirmedHostSideBooking(hostId, startTime, endTime, picture, address) VALUES (?)`;
  var values = [req.body.hostId, req.body.checkIn, req.body.checkOut, req.body.picture, req.body.address];
  db.query(sql, [values], function(err,result,fields){
    if(err){
      throw(err);
      res.status(500).send("Booking Error");
    }
  });
   res.status(200).send(req.body);
  // var renter = req.body.renterId;
  // var host = req.body.host;
  // var startTime =
});





// ====================================== //


// ============== Other useful routes ================ //

app.use('*', function(req,res){
	res.status(404).send("Not Found");
});

server.listen(app.get('PORT'), function(){
	console.log('Listening at ' + app.get('PORT'));

  transporter = nodemailer.createTransport('smtps://admin%40cache370.com:ilovedorian@mail.privateemail.com');
});

process.on('exit', function() {
  console.log("About to exit");
  db.end();
});

process.on('uncaughtException', function(err){
  console.log('Caught exception: ', err);
});
