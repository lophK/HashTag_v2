var express = require('express');
var router = express.Router();
var db=require('../condb');


var router = express();


router.post('/auth', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;

  if (username && password) {
  
// check if user exists
      db.query('SELECT * FROM account_user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      
          if (results.length > 0) {
            
              request.session.loggedin = true;
              request.session.username = username;
              response.status(200).json({message: "Done"});       
              console.log(results.length);
             // response.redirect('user-list');
          } else {
            response.send('Incorrect Username and/or Password!');
          }           
          response.end();
      });
  } else {
    response.send('Please enter Username and Password!');
      //response.end();
  }
});

module.exports = router;
