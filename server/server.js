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
  var sql = `SELECT * FROM User WHERE uId=${id}`;
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

  if(req.query.sqft){
    if(sql_filter === `WHERE ` && req.query.sqft){
      sql_filter += `squareFeet >= (${req.query.sqft})`;
    } else {
      sql_filter += ` AND squareFeet >= (${req.query.sqft})`;
    }
  }


  var sql = `SELECT b.bId, b.hostId, b.squareFeet, b.address, b.picture, b.status, b.latitude, b.longitude, b.price, ROUND((3959 * acos( cos( radians(${uLat}) )
                                          * cos( radians(b.latitude) )
                                          * cos( radians(b.longitude) - radians(${uLong}) )
                                          + sin( radians(${uLat}) )
                                          * sin( radians(b.latitude) ) ) ), 2 ) AS distance_miles
  FROM Booking b
  ${sql_filter !== `WHERE ` ? sql_filter : ""}
  GROUP BY b.bId
  HAVING distance_miles <= ${uRadius}
  ORDER BY b.bId DESC;`;

  if(req.query.bid === "all"){
    sql = `SELECT b.bId, b.hostId, b.squareFeet, b.address, b.picture, b.status, b.latitude, b.longitude, b.price, ROUND( 3959 * acos( cos( radians(${uLat}) )
                                                                                                                               * cos( radians(latitude) )
                                                                                                                               * cos( radians(longitude) - radians(${uLong}) )
                                                                                                                               + sin( radians(${uLat}) )
                                                                                                                               * sin( radians(latitude) ) ),2 ) as distance_miles
    FROM Booking b
    GROUP BY b.bId
    ORDER BY b.bId DESC;`;
  }
  console.log(sql);
  db.query(sql, function(err, result) {
    if(err){
      throw(err);
      res.status(500).send();
    }
    console.log(result);
    res.status(200).send(result);
  });
});

app.get('/booking/', (req,res) => {
  console.log(req.query);
  var id = req.query.bid;
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
        html: `<head> <meta name="viewport" content="width=device-width"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <title>Welcome to Cache!</title> <style>@media only screen and (max-width: 620px){table[class=body] h1{font-size: 28px !important; margin-bottom: 10px !important;}table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a{font-size: 16px !important;}table[class=body] .wrapper, table[class=body] .article{padding: 10px !important;}table[class=body] .content{padding: 0 !important;}table[class=body] .container{padding: 0 !important; width: 100% !important;}table[class=body] .main{border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important;}table[class=body] .btn table{width: 100% !important;}table[class=body] .btn a{width: 100% !important;}table[class=body] .img-responsive{height: auto !important; max-width: 100% !important; width: auto !important;}}@media all{.ExternalClass{width: 100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%;}.apple-link a{color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important;}.btn-primary table td:hover{background-color: #36319a !important;}.btn-primary a:hover{background-color: #36319a !important; border-color: #f8f291 !important;}}</style> </head> <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"> <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td><td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;"> <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;"> <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Welcome to Cache!</span> <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;"> <tr> <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;"> <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hello, ${req.body.first}</p><p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Booking ${req.body.bId}has been confirmed! Here are the details, work out the drop off yourselves.<br/> Renter:${result[0].first}${result[0].last}phone:${result[0].phone}. Host:${result2[0].first}${result2[0].last}phone:${result2[0].phone}</p><table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;"> <tbody> <tr> <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #f8f291; border-radius: 5px; text-align: center;"> <a href="http://cache370.com/" target="_blank" style="display: inline-block; color: #FFFFFF; background-color: #3498db; border: solid 1px #f8f291; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #FFFFFF;">Get Started!</a> </td></tr></tbody> </table> </td></tr></tbody> </table> <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Best,</p><p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Team Cache</p></td></tr></table> </td></tr></table> <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;"> Powered by <a href="http://cache370.com" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Cache</a>. </td></tr></table> </div></div></td><td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td></tr></table> </body></html>`
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
  let sql = `SELECT saves FROM User WHERE uId=${uid};`;
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
    html: `<head> <meta name="viewport" content="width=device-width"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <title>Welcome to Cache!</title> <style>@media only screen and (max-width: 620px){table[class=body] h1{font-size: 28px !important; margin-bottom: 10px !important;}table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a{font-size: 16px !important;}table[class=body] .wrapper, table[class=body] .article{padding: 10px !important;}table[class=body] .content{padding: 0 !important;}table[class=body] .container{padding: 0 !important; width: 100% !important;}table[class=body] .main{border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important;}table[class=body] .btn table{width: 100% !important;}table[class=body] .btn a{width: 100% !important;}table[class=body] .img-responsive{height: auto !important; max-width: 100% !important; width: auto !important;}}@media all{.ExternalClass{width: 100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%;}.apple-link a{color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important;}.btn-primary table td:hover{background-color: #36319a !important;}.btn-primary a:hover{background-color: #36319a !important; border-color: #f8f291 !important;}}</style> </head> <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"> <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td><td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;"> <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;"> <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Welcome to Cache!</span> <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;"> <tr> <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;"> <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi there, ${req.body.first}</p><p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">We're excited you've joined us here at Cache! To get started, do stuff. If you have any questions, don't hesitate to reply to this email. We look forward to helping you find the right storage plan.</p><table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;"> <tbody> <tr> <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #f8f291; border-radius: 5px; text-align: center;"> <a href="http://cache370.com/" target="_blank" style="display: inline-block; color: #FFFFFF; background-color: #3498db; border: solid 1px #f8f291; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #FFFFFF;">Get Started!</a> </td></tr></tbody> </table> </td></tr></tbody> </table> <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Best,</p><p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Team Cache</p></td></tr></table> </td></tr></table> <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;"> Powered by <a href="http://cache370.com" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Cache</a>. </td></tr></table> </div></div></td><td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td></tr></table> </body></html>`
};

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
  res.status(200).send(JSON.stringify(req.body));
});


app.post('/booking/new', (req, res) => {

  req = req.body;
  console.log(req.body);
  var sql = `INSERT INTO Booking(hostId, startTime, endTime, picture, address, latitude, longitude, squareFeet, status, price) VALUES (?)`;
  var values = [req.body.hostId, req.body.checkIn, req.body.checkOut, req.body.picture, req.body.address, req.body.latitude, req.body.longitude, req.body.squareFeet, 0, req.body.price];
  db.query(sql, [values], function(err,result,fields){
    if(err){
      throw(err);
      res.status(500).send("Booking Error");
    }
  });
  sql = `SELECT bId FROM Booking ORDER BY bId DESC LIMIT 1`;
  db.query(sql, function(err,result,fields){
    if(err){
      throw(err);
      res.status(500).send("Booking Error");
    }
    var bid = result[0].bId;
    console.log(bid);
    res.status(200).send(bid.toString());
  });
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
