var express = require('express');
var router = express.Router();
var randomstring = require('randomstring');
var nodemailer = require('nodemailer');
var moment = require('moment');
var monk = require('monk');
var db = monk('localhost:27017/aditya');
var collection = db.get('users');
var signup = db.get('signup');
var birth = db.get('birth');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('login');
});

router.get('/birthday', function(req, res) {
  res.render('birthday');
});

router.get('/home', function(req, res) {
  res.render('index');
});

router.get('/forgot', function(req, res) {
  res.render('forgot');
});

router.get('/getuser', function(req,res){
  collection.find({}, function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      console.log(docs);
      res.send(docs);
    }
  });
});

router.post('/postuser', function(req,res){
  //console.log(req.body);
  collection.insert(req.body, function(err,docs){
    if(err){
    	console.log(err);
    }
    else{
    	console.log(docs);
    	res.send(docs);
    }
  });
});

router.put('/updateuser:id', function(req,res){
  console.log(req.params.id);
  console.log(req.body);
  collection.update({"_id":req.params.id},{$set:req.body}, function(err, docs){
    if(err){
      console.log(err);
    }
    else{
      console.log(docs);
      res.send(docs);
    }
  })
});

router.delete('/deleteuser:id', function(req,res){
  console.log(req.params.id);
  collection.remove({"_id":req.params.id}, function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      //console.log(docs);
      res.send(docs);
    }
  });
});
//------------------------------login/signup-------------------------------
router.post('/postsignup', function(req,res){
  signup.insert(req.body, function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      res.send(docs);
    }
  });
});

router.post('/postlogin', function(req,res){
  var email1 = req.body.email;
  var password1 = req.body.password;
  signup.findOne({"email":email1,"password":password1}, function(err,docs){
    if(docs){
      res.send(docs);
    }
    else{
      res.sendStatus(500);
    }
  });
});

router.post('/postemail', function(req,res){
  var email = req.body.email;
  //console.log(req.body.email);
  var newpassword = randomstring.generate(5);
  //console.log(newpassword);
  signup.update({"email":email},{$set:{"password":newpassword}})
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sandeepsiva1121@gmail.com',
      pass: 'Jyothsna8'
    }
  });

  var mailOptions = {
    from: 'Technicalhub',
    to: email,
    subject: 'New password',
    text: 'your new password is'+newpassword
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent');
    }
  });
});

router.post('/postbirth', function(req,res){
  var dob = moment(req.body.dob).format('DD-MM');
  console.log(dob);
  var presentdate = moment().format('DD-MM');
  console.log(presentdate);
  var email = req.body.email;
  var name = req.body.name;
  birth.insert(req.body, function(err,docs){
    
  });
  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'sandeepsiva1121@gmail.com',
  //     pass: 'Jyothsna8'
  //   }
  // });

  // var mailOptions = {
  //   from: 'Technicalhub',
  //   to: email,
  //   subject: 'Birthday Wishes',
  //   text: 'Happy Birthday'+name
  // };

  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent');
  //   }
  //  });
});

module.exports = router;