var express = require('express');
var router = express.Router();
var db = require('../condb');

var express = require('express');
var router = express.Router();


router.post('/del_ac', function (req, res, next) {

        var id= req.body.id;
       // where id="+id+''
    console.log(id);
    db.query('DELETE FROM account_user WHERE id ='+id+'', function (error, results, fields) {
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
