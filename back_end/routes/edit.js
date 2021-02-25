var express = require('express');
var router = express.Router();
var db = require('../condb');

var express = require('express');
var router = express.Router();
var Password = require("node-php-password");
let super_key="super ultimate secret key";

function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
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
            
        
        var id= req.body.id;
        var fname= req.body.first_name;
        var lname= req.body.last_name;
        var email= req.body.email;
        var pass= req.body.password;
        var tel= req.body.tel_phone;
        var add= req.body.address;
        var bir= req.body.birthday;
        var img= req.body.user_img;

    //UPDATE  account_user  SET first_name="t", last_name="t",username="t", password="161042", tel_phone="t", address="t", birthday="2000-10-16" where id="1"
    //'UPDATE  account_user  SET first_name='+fname+',last_name='+lname+','+'username='+user+',password='+pass+',tel_phone='+tel+',address='+add+',birthday='+bir+' where id='+id+''
    console.log(fname + "   " + lname);
    
        db.query('UPDATE  account_user  SET first_name= '+fname+', last_name= '+lname+',email= '+email+', password= '+Password.hash(pass)+', tel_phone= '+tel+', address= '+add+', birthday= "'+bir+'", user_img= '+img+`where email='`+email+`'`, function (error, results, fields) {
            if(error) throw error
            if(error) {
                //console.log(error);
                res.status(500).json({message: "Invalid Request"});
            } else {
                //let inserted_id = results.id; // undefined
                //console.log(inserted_id);   
                res.status(200).json({message: "Done"});
                    var GRAB_USER = `SELECT * FROM account_user WHERE email = ?`
                        db.query(GRAB_USER, email, (err, result) => {
                            if (err) {
                                res.send('username  not found')
                            } 
                            else if (result.length==0) {
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
router.post('/edit_ac2', function (req, res,next) {
  const { email, password: plainTextPassword, first_name, last_name, birthday, tel_phone, address,user_img} = req.body;
  const password = Password.hash(plainTextPassword);
  //res.send('s');
  let sql = `UPDATE  account_user SET first_name = ?,last_name = ? ,email = ?, password = ?, tel_phone= ?, address= ?, birthday= ?, user_img= ? where email = ?`;
        
            sql = db.format(sql, [
               first_name, last_name,email,password,tel_phone,  address  ,  birthday ,user_img , email,
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

});


module.exports = router;
