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
  post.tag_id,
  post.post_time,
  post.post_status
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
//sss
  router.post('/select_follwing', function(req, res, next) {
   
    const { email} = req.body;
    var GRAB_follow = `SELECT
    follow_email 
    FROM
      follow
      WHERE user_email = ?`;
    db.query(GRAB_follow, email, (err, result) => {
      if (err) {
        res.json({message:"Error"})
      } 
      else if (result) {
        var user = result
       //console.log(user[0])
        res.send(user)
      }
      })
  });
  router.post('/viral_Tag', function(req, res, next) {
   
    const { email} = req.body;
    let sql = ` SELECT tag_name , tag_img ,
      COUNT(*) AS viral
  FROM tag t
  JOIN post p ON p.tag_id = t.tag_id

  GROUP BY t.tag_id
  ORDER BY viral DESC, t.tag_name DESC`;
  sql = db.format(sql, [
    email 
]);
    db.query(sql, (err, result) => {
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
  router.post('/select_com_by_post', function(req, res, next) {
   
    const { email} = req.body;
    var GRAB_follow = `SELECT
    db_loph.account_user.user_img, 
    db_loph.account_user.first_name, 
    db_loph.post.post_id, 
    db_loph.account_user.email, 
    db_loph.comment.com_description
  FROM
    db_loph.post
    INNER JOIN
    db_loph.comment
    ON 
      db_loph.post.post_id = db_loph.comment.post_id,
    db_loph.account_user
  WHERE
    db_loph.post.post_id = db_loph.comment.post_id AND
    db_loph.post.email_ac = db_loph.comment.email_com AND
    db_loph.comment.email_com = db_loph.account_user.email AND
    db_loph.account_user.email = ?`;
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
