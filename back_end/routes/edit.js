var express = require('express');
var router = express.Router();
var db = require('../condb');

var express = require('express');
var router = express.Router();


router.post('/edit_ac', function (req, res, next) {

        var id= req.body.id;
        var fname= req.body.first_name;
        var lname= req.body.last_name;
        var user= req.body.username;
        var pass= req.body.password;
        var tel= req.body.tel_phone;
        var add= req.body.address;
        var bir= req.body.birthday;

    //UPDATE  account_user  SET first_name="t", last_name="t",username="t", password="161042", tel_phone="t", address="t", birthday="2000-10-16" where id="1"
    //'UPDATE  account_user  SET first_name='+fname+',last_name='+lname+','+'username='+user+',password='+pass+',tel_phone='+tel+',address='+add+',birthday='+bir+' where id='+id+''
    console.log(fname + "   " + lname);
    db.query('UPDATE  account_user  SET first_name="'+fname+'", last_name="'+lname+'",username="'+user+'", password="'+pass+'", tel_phone="'+tel+'", address="'+add+'", birthday="'+bir+'"'+"where id="+id+'', function (error, results, fields) {
        if(error) throw error
        if(error) {
            //console.log(error);
              res.status(500).json({message: "Invalid Request"});
          } else {
            //let inserted_id = results.id; // undefined
            //console.log(inserted_id);   
            res.status(200).json({message: "Done"});       
          }
    });




})
module.exports = router;
