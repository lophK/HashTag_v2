
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
        const {email,tag_name,tag_description} = req.body;
   // const password = Password.hash(plainTextPassword);
            let sql = 'insert into tag (owner_tag,tag_name,tag_description)' +'values(?, ? ,?)';
        
            sql = db.format(sql, [
                email,tag_name,tag_description
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
router.post('/upload_image',upload.single('file'), async (req, res) => {
   console.log(req.body);
    // upload(req, res, (err) => {
    //    // console.log(req.file);
    //     if(err) {
    //         //console.log("faild");
    //        return res.json({
               
    //             status: false,
    //             message: err
    //         });
    //     } else {
           
    //         if(req.file == undefined) {
    //             console.log("xxx");
    //             res.json({
    //                 status: false,
    //                 message: "Errror: No file Selected"
    //             });
    //         } else {
    //             res.json({
                    
    //                 status: true,
    //                 message: "File Uploaded",
    //                 file: req.file.filename
    //             });
    //             console.log(req.body.post_id);
    //            //const {email,post_id} = req.body;
    //            // const x= 'xx@xx';
    //             //`SELECT max(id) FROM Post WHERE email = '`+req.body.email_ac+`'`
    //             // db.query(`select * from post WHERE email_ac='`+req.body.email_ac+`'`+'and post_id in (select max(post_id) from post )', function (error, resultss, fields) {
    //             //     if (error) throw error;
    //             //     numRows = resultss.length;
    //             //     var post_idd = resultss[0]
    //             //     console.log(post_idd['post_id']);
    //             //     //console.log(numRows);
    //             //     if (numRows < 0 ) {
    //             //         console.log(numRows);
    //             //         res.status(400).send(false);
    //             //     } else {
                        const po_id=req.body.post_id;
                      
                        let  path = 'http://localhost:3120/'+req.file.path;

                        console.log(path);
                        // const password = Password.hash(plainTextPassword);
                                 let sql = 'insert into IMG_file (post_id,path)' +'values(?, ?)';
                             
                                 sql = db.format(sql, [
                                    po_id,path
                                 ]);
                                 db.query(sql, (error, results, fields) => {
                                     if (error) throw error;
                                     if (results.affectedRows > 0) {
                                         res.status(200).send(true);
                                     } else {
                                         res.status(200).send(false);
                                     }
                                 });
                //     }
                // });
            
    //         }
    //     }
    // });

});
function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }
module.exports = router;
