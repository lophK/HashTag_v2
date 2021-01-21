var express = require('express');
var router = express.Router();
var db=require('../condb');
const bec = require('bcrypt');

var router = express();



// router.post('/auth', function(req, res, next) {
//   const username = req.body.username;
//   const password = req.body.password;
//   var sql = 'SELECT * FROM account_user WHERE username ='+"'?'";
  
//   console.log(username);
//   console.log(password);
//   db.query(sql,username,(error,results) => {
   
//     if(error){
//       console.log(error);
      
//     }else{
//       var pashash =results[0]; 
//         // console.log(bec.compareSync(password,results[0].password));
        
//         if(bec.compareSync(password,pashash.password)){
//           return res.status(200).json({
//               status_code:true,
//               data:results
//         })}
        // else{
        //   return res.status(500).json({
        //     status_code:false,
        //     //data:results
        // })}
      
//       // return res.status(200).json({
//       //   status_code:'200',
//       //   data:res
//       // })
//     }
//   })
// });
router.post('/auth', (req, res) => {
  var email = req.body.email
  var password = req.body.password
  console.log(email);
    console.log(password);
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

      bec.compare(password, user.password, (err, match) => {
        if (err) {
          res.send('password not match')
          return res.status(203).json({
            status_code:false
        })}
          else{
            return res.status(200).json({
              status_code:true,
              //data:results
          })}
      });
    }
  })
})

module.exports = router;
