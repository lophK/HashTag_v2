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

router.post('/del_post', function (req, res, next) {

  const {post_id} = req.body;
 // where id="+id+''
console.log(id);
db.query('DELETE FROM post WHERE post_id ='+post_id+'', function (error, results, fields) {
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

router.post('/comment-del', async function  (req, res, next) {
  //const { email, password: plainTextPassword, first_name, last_name, birthday, tel_phone, address, user_img} = req.body;
 
      const {com_id} = req.body;
 // const password = Password.hash(plainTextPassword);
          let sql = 'DELETE FROM comment where com_id = ?';
      
          sql = db.format(sql, [
            com_id
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
