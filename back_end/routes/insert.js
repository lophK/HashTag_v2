
var express = require('express');
var router = express.Router();
var db = require('../condb');

var express = require('express');
var router = express.Router();
var Password = require("node-php-password");

const fs = require('fs');

router.post('/register_ac', async function  (req, res, next) {
    const { email, password: plainTextPassword, first_name, last_name, birthday, tel_phone, address, user_img} = req.body;
    const password = Password.hash(plainTextPassword);
    db.query(`SELECT * FROM account_user WHERE email = '`+email+`'`, function (error, result, fields) {
        if (error) throw error;
        numRows = result.length;
        if (numRows > 0 ) {
            console.log(numRows);
            res.status(400).send(false);
        } else {
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
        }
});
})

router.post('/Post_', async function  (req, res, next) {
    //const { email, password: plainTextPassword, first_name, last_name, birthday, tel_phone, address, user_img} = req.body;
    const {tag_id,post_detail,post_status} = req.body;
   // const password = Password.hash(plainTextPassword);
            let sql = 'insert into post (tag_id,post_detail ,post_status)' +
            'values(?, ?, ?)';
        
            sql = db.format(sql, [
                tag_id,post_detail,post_status
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
router.post('/tag_', async function  (req, res, next) {
    //const { email, password: plainTextPassword, first_name, last_name, birthday, tel_phone, address, user_img} = req.body;
    const { tag_name} = req.body;
    db.query(`SELECT * FROM tag WHERE tag_name = '`+tag_name+`'`, function (error, result, fields) {
        if (error) throw error;
        numRows = result.length;
        console.log(numRows);
        if (numRows > 0 ) {
            console.log(numRows);
            res.status(400).send(false);
        } else {
        const {tag_name,tag_description} = req.body;
   // const password = Password.hash(plainTextPassword);
            let sql = 'insert into tag (tag_name,tag_description)' +'values(?, ?)';
        
            sql = db.format(sql, [
                tag_name,tag_description
            ]);
            db.query(sql, (error, results, fields) => {
                if (error) throw error;
                if (results.affectedRows > 0) {
                    res.status(200).send(true);
                } else {
                    res.status(200).send(false);
                }
            });
        }
    });

})
module.exports = router;
