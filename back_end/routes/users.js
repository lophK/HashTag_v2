var express = require('express');
var router = express.Router();
var db=require('../condb');

const { eco } = require('consolidate');


// another routes also appear here
// this script to fetch data from MySQL databse table


router.post('/user-data', function(req, res, next) {
  var email = req.body.email;
    var sql='SELECT first_name , last_name , email , tel_phone , address , birthday , user_img FROM account_user where email = ?';
    db.query(sql,[email], function (err, result, fields) {
    if (err) throw err;
    else{
      var user = result[0];
      res.send(user);
    }
    res.end();
  });
 
});

module.exports = router;