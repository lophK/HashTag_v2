var express = require('express');
var router = express.Router();
var db = require('../condb');

var express = require('express');
var router = express.Router();


router.post('/register_ac', function (req, res, next) {
    // "first_name":"kk",
    // "last_name":"kk",
    // "username":"kk",
    // "password":"161042"
    // "tel_phone":"kk",
    // "address":"kk",
    //  "birthday":"1999-16-10:16:20.000Z"

    //res.send(user + ' ' + pass );

    var fname = req.body.first_name;
    var lname = req.body.last_name;
    var user = req.body.username;
    var pass = req.body.password;
    var tel = req.body.tel_phone;
    var add = req.body.address;
    var bir = req.body.birthday;
    // db.query('INSERT INTO account_user (first_name,last_name,username,password,tel_phone,address,birthday) VALUES (?,?,?,?,?,?,?)',[fname,lname,user,pass,tel,add,bir], function (error, results, fields) {


    console.log(fname + "   " + lname);
    if (req.body !=null) {

        var sql = 'SELECT * FROM account_user  WHERE username="'+user+'"';
        db.query(sql, function (err, data, fields) {
            if (err) throw err;
           //console.log(data);
            if(data.length <=0){
                db.query('INSERT INTO account_user (first_name,last_name,username,password,tel_phone,address,birthday) VALUES (?,?,?,?,?,?,?)', [fname, lname, user, pass, tel, add, bir], function (error, results, fields) {

                    if (results.length >= 1) {
                        res.send('Error');
                       
                       
                    } else {
                        req.session.loggedin = true;
                        req.session.user = user;
                        res.send('register Succes');
                        console.log(results);
                         // response.redirect('user-list');
                    }
                    res.end();
                });
            }
            else {
                res.send('Username exits');
            }
           
            
        });




    } else {
        res.send('Please enter Your Data');
        //response.end();
    }




})
module.exports = router;
