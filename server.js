// ============== Imports =============== //
const cors = require('cors');
const http = require('http');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
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
  var password = req.body.password
  sql = `SELECT uId FROM User WHERE email='${email}' AND password='${password}';`
  db.query(sql, function(err,result,fields){
    if(err){
      throw(err);
      response.status(400).send({id:-1});
    }
    if(result) {
      var id = result[0]['uId'];
      response.status(200).send({id:id});
    } else {
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
  console.log(req.body);

  var sql = `INSERT INTO User (first, last, email, password, phone, profPic) VALUES (?)`;
  var values = Object.keys(req.body).map(function(_){return req.body[_]});

  values[3] = bcrypt.hashSync(req.body.password, 10);
  console.log(values);

  db.query(sql, [values], function(err,result,fields){
    if(err) throw(err);
  });


  var mailOptions = {
    from: '"Cache Team" <admin@cache370.com>', // sender address
    to: req.body.email, // list of receivers
    subject: 'Welcome!', // Subject line
    text: 'Hey there! Welcome to Cache! We are excited to have you.', // plaintext body
    html: `  <head>
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Welcome to Cache!</title>
        <style>
        /* -------------------------------------
            INLINED WITH htmlemail.io/inline
        ------------------------------------- */
        /* -------------------------------------
            RESPONSIVE AND MOBILE FRIENDLY STYLES
        ------------------------------------- */
        @media only screen and (max-width: 620px) {
          table[class=body] h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important;
          }
          table[class=body] p,
                table[class=body] ul,
                table[class=body] ol,
                table[class=body] td,
                table[class=body] span,
                table[class=body] a {
            font-size: 16px !important;
          }
          table[class=body] .wrapper,
                table[class=body] .article {
            padding: 10px !important;
          }
          table[class=body] .content {
            padding: 0 !important;
          }
          table[class=body] .container {
            padding: 0 !important;
            width: 100% !important;
          }
          table[class=body] .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important;
          }
          table[class=body] .btn table {
            width: 100% !important;
          }
          table[class=body] .btn a {
            width: 100% !important;
          }
          table[class=body] .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important;
          }
        }
        /* -------------------------------------
            PRESERVE THESE STYLES IN THE HEAD
        ------------------------------------- */
        @media all {
          .ExternalClass {
            width: 100%;
          }
          .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
            line-height: 100%;
          }
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important;
          }
          .btn-primary table td:hover {
            background-color: #36319a !important;
          }
          .btn-primary a:hover {
            background-color: #36319a !important;
            border-color: #f8f291 !important;
          }
        }
        </style>
      </head>
      <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
        <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
          <tr>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
            <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
              <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

                <!-- START CENTERED WHITE CONTAINER -->
                <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Welcome to Cache!</span>
                <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">

                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                        <tr>
                          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi there, ${req.body.first}</p>
                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">We're excited you've joined us here at Cache! To get started, do stuff. If you have any questions, don't hesitate to reply to this email. We look forward to helping you find the right storage plan.</p>
                            <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                              <tbody>
                                <tr>
                                  <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                      <tbody>
                                        <tr>
                                          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #f8f291; border-radius: 5px; text-align: center;"> <a href="http://cache370.com/" target="_blank" style="display: inline-block; color: #FFFFFF; background-color: #3498db; border: solid 1px #f8f291; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #FFFFFF;">Get Started!</a> </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Best,</p>
                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Team Cache</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                <!-- END MAIN CONTENT AREA -->
                </table>

                <!-- START FOOTER -->
                <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">

                    <tr>
                      <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                        Powered by <a href="http://cache370.com" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Cache</a>.
                      </td>
                    </tr>
                  </table>
                </div>
                <!-- END FOOTER -->

              <!-- END CENTERED WHITE CONTAINER -->
              </div>
            </td>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
          </tr>
        </table>
      </body>` // html body
};

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
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

  transporter = nodemailer.createTransport('smtps://admin%40cache370.com:ilovedorian@mail.privateemail.com');
});

process.on('exit', function() {
  console.log("About to exit");
  db.end();
});

process.on('uncaughtException', function(err){
  console.log('Caught exception: ', err);
});
