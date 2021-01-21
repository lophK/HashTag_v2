var express = require('express');
var router = express.Router();
var db = require('../condb');
const bec = require('bcrypt');
var express = require('express');
var router = express.Router();


router.post('/register_ac', async function  (req, res, next) {
    // var fname = req.body.first_n;
    // var lname = req.body.last_n;
    // var email = req.body.email;
    // var pass = req.body.password;
    // var tel = req.body.tel;
    // var add = req.body.address;
    // var bir = req.body.birthday;
    // var phash=await bec.hashSync(pass,10);
    
    const { email, password: plainTextPassword, first_name, last_name, birthday, tel_phone, address} = req.body;
    const password = await bec.hash(plainTextPassword, 10);
    // console.log(req.body);
    let sql = 'insert into account_user (first_name,last_name ,email, password, tel_phone, address, birthday)' +
    'values(?, ?, ?, ?, ?, ?, ?)';

    sql = db.format(sql, [
       first_name, last_name,email,password,tel_phone,  address  ,  birthday
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
module.exports = router;
