var express = require('express');
var router = express.Router();
var db=require('../condb');

var Password = require("node-php-password");
var router = express();

//http://hashtagbe.comsciproject.com/login/auth

router.post('/auth', (req, res) => {
  var email = req.body.email
  var password = req.body.password

  var GRAB_USER = `SELECT * FROM account_user WHERE email = ?`
  db.query(GRAB_USER, email, (err, result) => {
    if (err) {
        res.send('username  not found')
    } 
    else if (result.length==0) {
      res.send('username not found') //this is what you are missing
    }
    else {
      var user = result[0]
      //console.log(user);
      if(Password.verify(password, user['password'])){
        return res.send(user);
  }else{
      res.send('password not match')
      return res.status(203).json({
        status_code:false
        //Authentication FAILED
        })
      }
    }
  })
})

module.exports = router;
