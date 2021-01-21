
var express = require('express');
var router = express.Router();
var db = require('../condb');

var express = require('express');
var router = express.Router();
var Password = require("node-php-password");


router.post('/register_ac', async function  (req, res, next) {
    // var fname = req.body.first_n;
    // var lname = req.body.last_n;
    // var email = req.body.email;
    // var pass = req.body.password;
    // var tel = req.body.tel;
    // var add = req.body.address;
    // var bir = req.body.birthday;
    // var phash=await bec.hashSync(pass,10);
    


    
    const { email, password: plainTextPassword, first_name, last_name, birthday, tel_phone, address ,user_img} = req.body;
    const password = Password.hash(plainTextPassword);
    // console.log(req.body);
    let sql = 'insert into account_user (first_name,last_name ,email, password, tel_phone, address, birthday, user_img)' +
    'values(?, ?, ?, ?, ?, ?, ?, ?)';

    sql = db.format(sql, [
       first_name, last_name,email,password,tel_phone,  address  ,  birthday ,user_img
    ]);
    db.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
    });
})
router.post('/ac', async function  (req, res, next) {
   res.send("suc");
})
module.exports = router;
