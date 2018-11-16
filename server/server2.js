// ============== Imports =============== //
const cors = require('cors');
const http = require('http');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
// ====================================== //


// ============== Mailer ============== //
var transporter = nodemailer.createTransport('smtps://admin%40cache370.com:ilovedorian@mail.privateemail.com');
// ====================================== //

// ============== Database ============== //
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'web_client',
  password : 'web_client',
  database : 'cache'
});
// ====================================== //

// ============== AWS S3 ============== //
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();
// ====================================== //

// ============== File Upload ============== //
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.CACHE_S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};
// ====================================== //


// ============== Server ================ //
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('PORT', process.env.PORT || 5000);
// ====================================== //

// ============== GET Requests ================ //

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

app.post('/users/login', (req, response) => {
  var email = req.body.email;
  var password = req.body.password;
  sql = `SELECT uId, password FROM User WHERE email='${email}';`
  db.query(sql, function(err,result,fields){
    result = result[0];
    console.log(result);
    if(result && bcrypt.compareSync(password, result.password) && !err) {
      var id = result['uId'];
      response.status(200).send({id:id});
    } else {
      throw(err);
      response.status(400).send({id:-1});
    }
  });

});

app.get('/profile/:id', (req, res) => {
  var id = req.params.id;

  // should be selecting certain rows, probably shouldn't send password back to client
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
  var uLat = req.query.uLat ? req.query.uLat : 0;
  var uLong = req.query.uLong ? req.query.uLong : 0;
  var uRadius = req.query.uRadius ? req.query.uRadius : 25001;
  var sql = `b.bId, b.hostId, b.squareFeet, b.address, b.picture, (3959 * acos( cos( radians(${uLat}) )
                                          * cos( radians(b.latitude) )
                                          * cos( radians(b.longitude) - radians(${uLong}) )
                                          + sin( radians(${uLat}) )
                                          * sin( radians(${uLong}) ) ) ) AS distance_miles
  FROM UnconfirmedHostSideBooking b
  GROUP BY b.bId
  HAVING distance_miles <= ${uRadius}
  ORDER BY distance_miles ASC;`;
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
  var values = [req.body.first, req.body.last, req.body.email, req.body.password, req.body.phone, req.body.profPic];//Object.keys(req.body).map(function(_){return req.body[_]});

  values[3] = bcrypt.hashSync(req.body.password, 10);

  db.query(sql, [values], function(err,result,fields){
    if(err) throw(err);
  });


  var mailOptions = {
    from: '"Cache Team" <admin@cache370.com>', // sender address
    to: req.body.email, // list of receivers
    subject: 'Welcome!', // Subject line
    text: 'Hey there! Welcome to Cache! We are excited to have you.', // plaintext body
    html: `<b>Hey there, ${req.body.first}! Welcome to Cache! We are excited to have you.</b>` // html body
};

  // transporter.sendMail(mailOptions, function(error, info){
  //   if(error){
  //       console.log("error");
  //   } else {
  //       console.log('Message sent: ' + info.response);
  //   }
  // });

  res.status(200).send(req.body);
});

app.post('/confirmedbooking/new', (req, res) => {
  assert(renterId != hostId);
  assert(endTime > startTime);

  var sql = `INSERT INTO ConfirmedBooking (renterId, hostId, ursbId, uhsbId, picture, startTime,
     endTime, address, squareFeet, latitude, longitude) VALUES (?)`;
  var values = Object.keys(req.body).map(function(_){return req.body[_]});

  db.query(sql, [values], function(err,result,fields){
    if(err){
      res.status(500).send(req.body);
      throw(err);
    }
  });
  //After we confirm a booking, we can remove the unconfirmed bookings from the
  //DB to free up space
  uhsbId = req.body.uhsbId;
  ursbId = req.body.uhsbId;
  var sqlhrm = `DELETE FROM UnconfirmedHostSideBooking WHERE bId = ` + SqlString.escape(uhsbId);
  var sqlrrm = `DELETE FROM UnconfirmedRentSideBooking WHERE bId = ` + SqlString.escape(ursbId);

  db.query(sqlhrm, [values], function(err,result,fields){
    if(err){
      res.status(500).send(req.body);
      throw(err);
    }
  });
  db.query(sqlrrm, [values], function(err,result,fields){
    if(err){
      res.status(500).send(req.body);
      throw(err);
    }
  });

  res.status(200).send(req.body);
});


app.post('/booking/new', (req, res) => {

  console.log(req.body);
  req = req.body;
  var sql = `INSERT INTO UnconfirmedHostSideBooking(hostId, startTime, endTime, picture, address, latitude, longitude, squareFeet) VALUES (?)`;
  var values = [req.body.hostId, req.body.checkIn, req.body.checkOut, req.body.picture, req.body.address, req.body.latitude, req.body.longitude, req.body.squareFeet];
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



app.post('/unconfirmedhostsidebooking/new', (req, res) => {

});

// 404
app.use('*', function(req,res){
	res.status(404).send("Not Found");
});

server.listen(app.get('PORT'), function(){
	console.log('Listening at ' + app.get('PORT'));
});

process.on('exit', function() {
  console.log("About to exit");
  db.end();
});

process.on('uncaughtException', function(err){
  console.log('Caught exception: ', err);
});
