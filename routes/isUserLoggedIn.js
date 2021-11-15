var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
      isUserLoggedIn : req.session.isUserLoggedin,
      userId : req.session.userId
  }
  data = JSON.stringify(data);
  res.send(data);
});

module.exports = router;
