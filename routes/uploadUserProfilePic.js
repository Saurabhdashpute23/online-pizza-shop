var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var filename;
var fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/profilePic');
    },
    filename: (req, file, callback) => {
        var fileExtention = path.extname(file.originalname);
        filename = 'pofilepic_' + Date.now() + fileExtention;
        // filename = file.originalname;
        callback(null, filename);
    }
});

var upload = multer({storage: fileStorage}).single('profilePic');

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log("frm here")
  var data = {
      msg: 'Success'
  }
  upload(req, res, (error) => {
      if (error) {
          data.msg = 'Error while uploading image';
      } else {
          data.filePath = 'http://localhost:8081/profilePic/' + filename;
          data.msg = "successfuly uploaded image";
      }
      res.send(JSON.stringify(data));
  });
});

module.exports = router;
