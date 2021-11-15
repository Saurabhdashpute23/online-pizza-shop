var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017';
const Cryptr = require('cryptr');
const cryptr = new Cryptr('outsecretkey');

/* GET home page. */
router.post('/', function(req, res, next) {
    var data = {msg: 'success'};
    mongoClient.connect(url, (error, client) => {
        if (error) {
            data.msg = "Error while communicating with db";
        } else {
            var db = client.db("socialDen_app");
            var collection = db.collection("userAccountDetails");
            collection.find({accntId: req.body.accntId}).toArray((err, items) => {
                if (items.length > 0) {
                    data.msg = 'Error';
                    data.info = 'USer with id already exist';
                    data = JSON.stringify(data);
                    res.send(data);
                } else {
                    req.body.acntPwd =  cryptr.encrypt(req.body.acntPwd);                    
                    collection.insertOne(req.body, (err) => {
                        if (err) {
                            data.msg = 'Error while inserting';
                        } else {
                            data.msg = 'success';
                        }
                        data = JSON.stringify(data);
                        res.send(data);
                    });
                }
            });
           
        }
    })
});

module.exports = router;
