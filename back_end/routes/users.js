var express = require('express');
var router = express.Router();
var db=require('../condb');

const { eco } = require('consolidate');


// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/user', function(req, res, next) {
    var sql='SELECT * FROM account_user';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
     res.render('user-list', { title: 'User List', userData: data});
    //res.end();
  });
 
});

module.exports = router;