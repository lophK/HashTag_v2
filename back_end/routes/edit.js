var express = require('express');
var router = express.Router();
var db = require('../condb');

var express = require('express');
var router = express.Router();
var Password = require("node-php-password");
let super_key = "super ultimate secret key";
const mgJson = require('merge-json');
const jwt = require('jsonwebtoken');

const multer = require('multer');
var path = require('path');

// var router = express.Router();
var Password = require("node-php-password");
const cons = require('consolidate');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});//.single("file");
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


router.post('/edit_ac', function (req, res) {
    jwt.verify(req.body.token, super_key, (error) => {
        if (error) { res.sendStatus(403); }
        else {


            var id = req.body.id;
            var fname = req.body.first_name;
            var lname = req.body.last_name;
            var email = req.body.email;
            var pass = req.body.password;
            var tel = req.body.tel_phone;
            var add = req.body.address;
            var bir = req.body.birthday;
            var img = req.body.user_img;

            //UPDATE  account_user  SET first_name="t", last_name="t",username="t", password="161042", tel_phone="t", address="t", birthday="2000-10-16" where id="1"
            //'UPDATE  account_user  SET first_name='+fname+',last_name='+lname+','+'username='+user+',password='+pass+',tel_phone='+tel+',address='+add+',birthday='+bir+' where id='+id+''
            console.log(fname + "   " + lname);

            db.query('UPDATE  account_user  SET first_name= ' + fname + ', last_name= ' + lname + ',email= ' + email + ', password= ' + Password.hash(pass) + ', tel_phone= ' + tel + ', address= ' + add + ', birthday= "' + bir + '", user_img= ' + img + `where email='` + email + `'`, function (error, results, fields) {
                if (error) throw error
                if (error) {
                    //console.log(error);
                    res.status(500).json({ message: "Invalid Request" });
                } else {
                    //let inserted_id = results.id; // undefined
                    //console.log(inserted_id);   
                    res.status(200).json({ message: "Done" });
                    var GRAB_USER = `SELECT * FROM account_user WHERE email = ?`
                    db.query(GRAB_USER, email, (err, result) => {
                        if (err) {
                            res.send('username  not found')
                        }
                        else if (result.length == 0) {
                            res.send('username not found') //this is what you are missing
                        }
                        else {
                            var user = result[0]
                            //console.log(user);
                            return res.send(user);

                        }
                    })
                }
            });
        }
    });

});


router.post('/edit_post', function (req, res) {
    const { post_id } = req.body;
    let body = req.body;
    //console.log(req.body.post_id);
    let select_data = "select * from post where post_id = ?";
    sql2 = db.format(select_data, [
        post_id
    ]);
    db.query(sql2, (error, results, fields) => {
        let old_data = results[0];
        console.log(results[0]);
        if (results == "") {
            return res.json({
                success: 0,
                message: "nodata"
            })
        }
        let old_dataRes = JSON.parse(JSON.stringify(old_data));
        console.log(req.body.token);
        jwt.verify(req.body.token, super_key, (error, data) => {
            if (error) { res.sendStatus(403); }
            else {
                let newdata = mgJson.merge(old_dataRes, body);
                console.log(newdata);
                const { tag_id, post_detail, post_status, post_id, email_ac } = req.body;

                let sql = 'UPDATE  post  SET tag_id = ?, post_detail = ? ,post_status=?  where post_id = ? and email_ac = ?';

                sql = db.format(sql, [
                    newdata.tag_id, newdata.post_detail, newdata.post_status, post_id, email_ac
                ]);
                console.log(newdata.tag_id);
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

    });
});

router.post('/edit_ac2', function (req, res, next) {

    const { email2 } = req.body;

    let select_data = "select * from account_user where email = ?";
    sql2 = db.format(select_data, [
        email2
    ]);
    db.query(sql2, (error, results, fields) => {
        let old_data = results[0];
        if (results == "") {
            return res.json({
                success: 0,
                message: "nodata"
            })
        }
        let old_dataRes = JSON.parse(JSON.stringify(old_data));
        console.log(req.body.token);
        jwt.verify(req.body.token, super_key, (err) => {
            if (err) { res.sendStatus(403); }
            else {

                //res.send('s');
                const { email, password: plainTextPassword, first_name, last_name, birthday, tel_phone, address, user_img } = req.body;
                const password = Password.hash(plainTextPassword);
                let newdata = mgJson.merge(old_dataRes.body);
                let sql = `UPDATE  account_user SET first_name = ?,last_name = ? ,email = ?, password = ?, tel_phone= ?, address= ?, birthday= ?, user_img= ? where email = ?`;

                sql = db.format(sql, [
                    newdata.first_name, newdata.last_name, newdata.email, newdata.password, newdata.tel_phone, newdata.address, newdata.birthday, newdata.user_img, email
                ]);
                db.query(sql, (error, results, fields) => {
                    if (error) {
                        res.send('username  not found')
                    }
                    else {
                        var GRAB_USER = `SELECT * FROM account_user WHERE email = ?`
                        db.query(GRAB_USER, email, (err, result) => {
                            var user = result[0];
                            //console.log(user);
                            return res.send(user);
                        });
                    }
                });
            }
        });
    })
});

router.post('/comment-edit', async function (req, res, next) {
    //const { email, password: plainTextPassword, first_name, last_name, birthday, tel_phone, address, user_img} = req.body;

    const { post_id, com_description, com_time } = req.body;
    // const password = Password.hash(plainTextPassword);
    let sql = 'update  comment  com_description=?,com_time=? where post_id = ?';

    sql = db.format(sql, [
        com_description, com_time, post_id
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

router.post('/img-edit', upload.single('file'), async (req, res) => {
    //const { email, password: plainTextPassword, first_name, last_name, birthday, tel_phone, address, user_img} = req.body;

    const { post_id } = req.body;
    let path = 'http://' + 'hashtagbe' + '.comsciproject.com/images/' + req.file.filename;
    // const password = Password.hash(plainTextPassword);
    let sql = 'update  IMG_file set path = ? where post_id = ?';

    sql = db.format(sql, [
        path, post_id
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
