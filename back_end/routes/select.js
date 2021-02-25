var express = require('express');
var router = express.Router();
var db=require('../condb');
const jwt = require('jsonwebtoken');
var Password = require("node-php-password");
var  json  = require('body-parser');




router.post('/select_post', function(req, res, next) {
   
    const { email} = req.body;
    var GRAB_post = `SELECT * FROM post WHERE email_ac = ?`;
    db.query(GRAB_post, req.body.email, (err, result) => {
      if (err) {
        res.json({message:"Error"})
      } 
      else if (result) {
        var user = result[0]
        console.log(user);
       
          return res.json({ data: user, token:token });
      }
      })

  });
  module.exports = router;
