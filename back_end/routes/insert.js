
var express = require('express');
var router = express.Router();
var db = require('../condb');
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
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});//.single("file");

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tag_img_file/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload2 = multer({ 
    storage: storage2,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});//.single("file");

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
    const {tag_id,post_detail,post_status,email} = req.body;
        console.log(req.body);
   // const password = Password.hash(plainTextPassword);
            let sql = 'insert into post (tag_id,email_ac,post_detail ,post_status)' +
            'values(?, ?, ?, ?)';
        
            sql = db.format(sql, [
                tag_id,req.body.email_ac,post_detail,post_status
            ]);
            db.query(sql, (error, results, fields) => {
                
                let   id;
                if (error) throw error;
                // if (results.affectedRows > 0) {
                   
                //     console.log("id = "+this.id);
                //     res.status(200).send(true);
                // } else {
                //     res.status(200).send(false);
                // }
            });
            db.query(`select * from post WHERE email_ac='`+req.body.email_ac+`'`+'and post_id in (select max(post_id) from post )', function (error, resultss, fields) {
                if (error) throw error;
                numRows = resultss.length;
                var post_idd = resultss[0];
                //console.log(post_idd['post_id']);
                //console.log(numRows);
                if (numRows < 0 ) {
                    console.log(numRows);
                    res.status(400).send(false);
                } else {
                 id = resultss[0];
                 console.log("idddd="+id['post_id']);
                    //res.status(400).send(true);
                    return res.json({ post_id: id['post_id']});
                   
                }
            });
       //ป 

})

router.post('/tag_', upload2.single('file'), async  (req, res) =>{
    const { tag_name} = req.body;
    db.query(`SELECT * FROM tag WHERE tag_name = '`+tag_name+`'`, function (error, result, fields) {
        if (error) throw error;
        numRows = result.length;
        console.log(numRows);
        if (numRows > 0 ) {
            console.log(numRows);
            res.status(400).send(false);
        } else {
        const {owner_tag,tag_name} = req.body;
        let  path_img = 'http://'+'hashtagbe'+'.comsciproject.com/tag_img_file/'+req.file.filename;
   // const password = Password.hash(plainTextPassword);
            let sql = 'insert into tag (tag_img,owner_tag,tag_name)' +'values(?,?,?)';
        
            sql = db.format(sql, [
                path_img,owner_tag,tag_name
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

router.post('/like_', async function (req, res){
  
        const {post_id,email_like} = req.body;
     

            let sql = 'insert into like_table (post_id,email_like)' +'values(?,?)';
        
            sql = db.format(sql, [
                post_id,email_like
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
router.post('/Unlike_', async function (req, res){
  
    const {post_id,email_like} = req.body;

        let sql = 'DELETE FROM like_table  where post_id = ? and email_like=?';
    
        sql = db.format(sql, [
            post_id,email_like
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
router.post('/show_ac_like', async function (req, res){
  
    const { email} = req.body;
    var GRAB_post = 'SELECT COUNT(like_id) FROM like_table GROUP BY post_id';

    db.query(GRAB_post, req.body.email, (err, result) => {
      if (err) {
        res.json({message:"Error"})
      } 
      else if (result) {
        var user = result
        console.log(user);
        res.send(user)
      }
      })   
})
router.post('/Follow', async function  (req, res, next) {
    //const { email, password: plainTextPassword, first_name, last_name, birthday, tel_phone, address, user_img} = req.body;
   
        const {user_email,follow_email} = req.body;
   // const password = Password.hash(plainTextPassword);
            let sql = 'insert into follow (user_email,follow_email)' +'values(?, ?)';
        
            sql = db.format(sql, [
                user_email,follow_email
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
router.post('/comment-post', async function  (req, res, next) {
    //const { email, password: plainTextPassword, first_name, last_name, birthday, tel_phone, address, user_img} = req.body;
   
        const {post_id,com_description,com_time} = req.body;
   // const password = Password.hash(plainTextPassword);
            let sql = 'insert into comment (post_id,com_description,com_time)' +'values(?, ?,?)';
        
            sql = db.format(sql, [
                post_id  ,com_description,com_time
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


router.post('/upload_image',upload.single('file'), async (req, res) => {
   //console.log(req.body);
                        const po_id=req.body.post_id;
                                     //http://hashtagbe.comsciproject.com/images/1614295271477.jpg
                        let  path1 = 'http://'+'hashtagbe'+'.comsciproject.com/images/'+req.file.filename;

                        console.log(path1);
                        // const password = Password.hash(plainTextPassword);
                                 let sql = 'insert into IMG_file (post_id,path)' +'values(?, ?)';
                             
                                 sql = db.format(sql, [
                                    po_id,path1
                                 ]);
                                 db.query(sql, (error, results, fields) => {
                                     if (error) throw error;
                                     if (results.affectedRows > 0) {
                                         res.status(200).send(true);
                                     } else {
                                         res.status(200).send(false);
                                     }
                                 });
});

function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    console.log(file.originalname);
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }
module.exports = router;
