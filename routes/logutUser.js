var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.isUserLoggedin = false;
  var data  = {
      msg: 'success'
  }
  res.send(JSON.stringify(data));
});

module.exports = router;
