var express = require('express');
var router = express.Router();
var db=require('../condb');
const jwt = require('jsonwebtoken');
var Password = require("node-php-password");
var  json  = require('body-parser');
var router = express();

//http://hashtagbe.comsciproject.com/login/auth
const JWT_KEY = "super ultimate secret key";

router.post('/auth', (req, res) => {
  var email = req.body.email
  var password = req.body.password

  var GRAB_USER = `SELECT * FROM account_user WHERE email = ?`
  db.query(GRAB_USER, email, (err, result) => {
    if (err) {
      res.json({message:"Error"})
    } 
    else if (result) {
      var user = result[0]
      //console.log(user);
      if(Password.verify(password, user['password'])){
        
        const token = jwt.sign({
          email :user.email,
        },
        JWT_KEY
        );
        console.log(token);
        return res.json({ email: user.email, token:token });
  }else{
      res.send('password not match')
      return res.status(203).json({
        status_code:false,
        
        //Authentication FAILED
        })
      }
    }
  })
})


module.exports = router;
