// ============== Imports =============== //
const cors = require('cors');
const http = require('http');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const web3 = require('web3');
const axios = require('axios');
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
    if(result &&
       bcrypt.compareSync(password, result.password) &&
       !err) {
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
  var uRadius = req.query.uRadius ? req.query.uRadius : 25000;

  var hostId = req.query.hostId ? req.query.hostId : '*';
  var status = req.query.status ? req.query.status : '*';
  var renterId = req.query.renderId ? req.query.renderId : '*';
  var bid = req.query.bid ? req.query.bid : '*'

  var filter_params = ['hostId', 'renterId', 'status'];
  var sql_filter = `WHERE `
  var filter_str = [];

  filter_params.map(function(param){
    if (req.query[param]){
      filter_str.push(`${param} = ${req.query[param]}`);
    }
  });

  filter_str = filter_str.join(' AND ');

  sql_filter = sql_filter + filter_str;

  if(req.query.bid){
    if(sql_filter === `WHERE ` && req.query.bid){
      sql_filter += `bId IN (${bid})`;
    } else {
      sql_filter += ` AND bId IN (${bid})`;
    }
  }


  var sql = `SELECT b.bId, b.hostId, b.squareFeet, b.address, b.picture, b.status, (3959 * acos( cos( radians(${uLat}) )
                                          * cos( radians(b.latitude) )
                                          * cos( radians(b.longitude) - radians(${uLong}) )
                                          + sin( radians(${uLat}) )
                                          * sin( radians(${uLong}) ) ) ) AS distance_miles
  FROM Booking b
  ${sql_filter !== `WHERE ` ? sql_filter : ""}
  GROUP BY b.bId
  HAVING distance_miles <= ${uRadius}
  ORDER BY distance_miles ASC;`;

  db.query(sql, function(err, result) {
    if(err){
      throw(err);
      res.status(500).send();
    }
    console.log(result);
    res.status(200).send(result);
  });
});

app.get('/booking/:id', (req,res) => {
  var id = req.params.id;
  var sql = `SELECT * FROM Booking WHERE bId=${id}`;
  db.query(sql, function(err,result,fields){
    if(err){
      throw(err);
      res.status(400).send("Could not complete request");
    }
    console.log(result);
    res.status(200).send(result[0]);
  });
});


app.post('/booking/confirm', (req, res) => {

  var sql = `UPDATE Booking SET status=1, renterId=${req.body.renterId} WHERE bid=${req.body.bId}`;
  db.query(sql, function(err,result,fields){
    if(err){
      throw(err);
    }
  });

  sql = `SELECT u.email, u.phone, u.first, u.last FROM User u LEFT JOIN Booking b ON b.renterId=u.uid WHERE b.bid=${req.body.bId}`;
  db.query(sql, function(err, result, fields){
    var sql2 = `SELECT u.email, u.phone, u.first, u.last FROM User u LEFT JOIN Booking b ON b.hostId=u.uid WHERE b.bid=${req.body.bId}`;
    console.log(result);
    var renterEmail = result[0].email;
    db.query(sql2, function(err, result2, fields){
      var hostEmail = result2[0].email;
      console.log(`Booking has been confirmed. Renter:${result[0].first} ${result[0].last} phone:${result[0].phone}. Host:${result2[0].first} ${result2[0].last} phone:${result2[0].phone}`);
      var mailOptions = {
        from: '"Cache Team" <admin@cache370.com>', // sender address
        to: [renterEmail, hostEmail], // list of receivers
        subject: 'Booking Confirmed!', // Subject line
        text: `Booking has been confirmed. Renter:${result[0].first} ${result[0].last} phone:${result[0].phone}. Host:${result2[0].first} ${result2[0].last} phone:${result2[0].phone} `, // plaintext body
        html: `Booking ${req.body.bId} has been confirmed!  Here are the details, work out the drop off yourselves. Renter:${result[0].first} ${result[0].last} phone:${result[0].phone}. Host:${result2[0].first} ${result2[0].last} phone:${result2[0].phone} `
    };

      transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
      });
    })
  });



  res.status(200).send();
});

app.get('/booking/flush', (req,res) => {
});

app.get('/booking/archive', (req,res) => {
  var curr_time = Date.now();
  var sql = `UPDATE Booking SET status=2, WHERE endTime >= ${curr_time}`;

  db.query(sql, function(err,result,fields){
    if(err){
      throw(err);
    }
  });

  res.status(200).send();
});



app.get('/saves/:uid', (req,res) => {
  var id = req.params.uid;
  var arr = [];
  var sql = `SELECT saves FROM User WHERE uId=${id}`;
  db.query(sql, function(err,result,fields){
    result = result[0].saves.split(",");
    res.status(200).send(result);
  });


  // get array of bid in saves field by user id
});

// had to split into different method due to asynchronous behavior of js
function handleSaves(bid, uid, method, callback){
  let sql = `SELECT saves FROM User WHERE uId=${uid}`;
  let arr = [];
  db.query(sql, function(err,result,fields){
    result = result[0]

    if(result.saves){
      result = result.saves.split(",");
    } else {
      result = []
    }

    if(method === "mk" &&
       !result.includes(bid)){
      result.push(bid);
    } else
    if(result.includes(bid) &&
       method === "rm"){
      result.splice( result.indexOf(bid), 1 );
    }

    sql2 = `UPDATE User SET saves='${result.join(',')}' WHERE uId=${uid}`;
    db.query(sql2, function(err,result2,fields){
      if(err) console.log(err);
      callback(result);
    });

  });
}

app.get('/saves/rm/:uid/:bid', (req, res) => {
  var bid = req.params.bid;
  var uid = req.params.uid;
  handleSaves(bid, uid, "rm", function(arr){
    res.status(200).send(arr)
  });
});

app.get('/saves/:uid/:bid', (req, res) => {
  var bid = req.params.bid;
  var uid = req.params.uid;
  handleSaves(bid, uid, "mk", function(arr){
    console.log(arr);
    res.status(200).send(arr)
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
  console.log(req.body);
  var sql = `INSERT INTO User (first, last, email, password, phone, profPic) VALUES (?)`;
  var values = Object.keys(req.body).map(function(_){return req.body[_]});

  values[3] = bcrypt.hashSync(req.body.password, 10);
  db.query(sql, [values], function(err,result,fields){

    if(err){
      throw(err);
      console.log("uh oh");
    }
  });


  var mailOptions = {
    from: '"Cache Team" <admin@cache370.com>', // sender address
    to: req.body.email, // list of receivers
    subject: `Welcome to Cache, ${req.body.first} ${req.body.last}!`, // Subject line
    text: 'Hey there! Welcome to Cache! We are excited to have you.', // plaintext body
    html: `Hey there, ${req.body.first}! Welcome to Cache. We are excited to have you.  Login to your account and host or rent a space!`
};

  // transporter.sendMail(mailOptions, function(error, info){
  //   if(error){
  //       return console.log(error);
  //   }
  //   console.log('Message sent: ' + info.response);
  // });
  res.status(200).send(JSON.stringify(req.body));
});


app.post('/booking/new', (req, res) => {

  //req = req.body;
  var sql = `INSERT INTO Booking(hostId, startTime, endTime, picture, address, latitude, longitude, squareFeet, status) VALUES (?)`;
  var values = [req.body.hostId, req.body.checkIn, req.body.checkOut, req.body.picture, req.body.address, req.body.latitude, req.body.longitude, req.body.squareFeet, 0];
  db.query(sql, [values], function(err,result,fields){
    if(err){
      throw(err);
      res.status(500).send("Booking Error");
    }
  });
  // sql = `SELECT bId FROM Booking WHERE hostId=${req.body.hostId} ORDER BY bId DESC LIMIT 1`;
  // db.query(sql, function(err,result,fields){
  //   if(err){
  //     throw(err);
  //     res.status(500).send("Booking Error");
  //   }
  //   var bid = result[0].bId;
  //   console.log(bid);
  //   res.status(200).send(bid.toString());
  // });
  res.status(200).send();
});


// 404
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
