var express = require('express');
var router = express.Router();
var db=require('../condb');
const jwt = require('jsonwebtoken');
var Password = require("node-php-password");
var  json  = require('body-parser');




router.post('/select_post', function(req, res, next) {
   
    const { email} = req.body;
    var GRAB_post = `SELECT
	db_loph.post.post_detail, 
	db_loph.IMG_file.path
FROM
	db_loph.post
	INNER JOIN
	db_loph.IMG_file
ON 
db_loph.post.post_id = db_loph.IMG_file.post_id	
WHERE
    db_loph.post.email_ac = ?
    ORDER BY db_loph.post.post_time DESC`;
    //ON 
        // db_loph.IMG_file.post_id = db_loph.post.post_id
    db.query(GRAB_post, req.body.email, (err, result) => {
      if (err) {
        res.json({message:"Error"})
      } 
      else if (result) {
        var user = result
        console.log(user);
       
        res.send(user)
      }
      })
  });
  router.post('/select_post_all', function(req, res, next) {
   
    const { email} = req.body;
    var GRAB_post = `SELECT
	post.email_ac, 
	post.post_id, 
	tag.tag_name, 
	IMG_file.path, 
	account_user.user_img, 
	account_user.first_name, 
	account_user.last_name, 
	post.post_detail, 
	post.tag_id
FROM
	tag
	INNER JOIN
	post
	ON 
		tag.tag_id = post.tag_id
	INNER JOIN
	IMG_file
	ON 
		post.post_id = IMG_file.post_id,
    account_user
    WHERE
	account_user.email = post.email_ac
    ORDER BY db_loph.post.post_time DESC`;
    //ON 
        // db_loph.IMG_file.post_id = db_loph.post.post_id
    db.query(GRAB_post, req.body.email, (err, result) => {
      if (err) {
        res.json({message:"Error"})
      } 
      else if (result) {
        var user = result
       
        res.send(user)
      }
      })
  });

  router.post('/select_tag_all', function(req, res, next) {
   
    const { email} = req.body;
    var GRAB_post = `SELECT tag_name,tag_id from tag`;
    //ON 
        // db_loph.IMG_file.post_id = db_loph.post.post_id
    db.query(GRAB_post, req.body.email, (err, result) => {
      if (err) {
        res.json({message:"Error"})
      } 
      else if (result) {
        var user = result
        console.log(user);
       
        res.send(user)
      }
      })
  });

  router.post('/select_tag_email', function(req, res, next) {
   
    const { email} = req.body;
    var GRAB_tag = `SELECT tag.tag_name WHERE owner_tag = ?`;
    //ON 
        // db_loph.IMG_file.post_id = db_loph.post.post_id
    db.query(GRAB_tag, email, (err, result) => {
      if (err) {
        res.json({message:"Error"})
      } 
      else if (result) {
        var user = result
        console.log(user);
       
        res.send(user)
      }
      })
  });

  router.post('/select_follwing', function(req, res, next) {
   
    const { email} = req.body;
    var GRAB_follow = `SELECT 
    DISTINCTROW follow.follow_email , account_user.user_img
    FROM follow
    LEFT JOIN account_user ON account_user.email = 'naratihporiginal@gmail.com'`;
    db.query(GRAB_follow, email, (err, result) => {
      if (err) {
        res.json({message:"Error"})
      } 
      else if (result) {
        var user = result
       console.log(user[0])
        res.send(user)
      }
      })
  });
  module.exports = router;
