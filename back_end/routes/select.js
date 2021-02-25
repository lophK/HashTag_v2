var express = require('express');
var router = express.Router();
var db=require('../condb');
const jwt = require('jsonwebtoken');
var Password = require("node-php-password");
var  json  = require('body-parser');




router.post('/select_post', function(req, res, next) {
   
    const { email} = req.body;
    var GRAB_post = `SELECT
	db_loph.post.post_id, 
	db_loph.IMG_file.*
FROM
	db_loph.IMG_file
	INNER JOIN
	db_loph.post
ON 
    db_loph.IMG_file.post_id = db_loph.post.post_id	
WHERE
    db_loph.post.email_ac = '`+req.body.email+`'`;
    //ON 
        // db_loph.IMG_file.post_id = db_loph.post.post_id
    db.query(GRAB_post, req.body.email, (err, result) => {
      if (err) {
        res.json({message:"Error"})
      } 
      else if (result) {
        var user = result
        console.log(user);
       
          return res.json({ email: 'sss' });
      }
      })
  });
  module.exports = router;
