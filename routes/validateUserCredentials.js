
var express = require("express");
var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('outsecretkey');

var dburl = 'mongodb://localhost:27017'

var router = express.Router();

router.post('/', (request, response, next) => {
    var data = {msg: ''}
    console.log(request.body);
    mongoClient.connect(dburl, (err, client) => {
        if (err) {
            data.msg = 'Error while connecting to db';
        } else {
            var db = client.db("socialDen_app");
            var collection = db.collection("userAccountDetails");
            collection.find({accntId: request.body.uid}).toArray((error, items) => {
                if (error) {
                    data.msg = "Error while connecting to collection";
                } else {

                    if (request.body.upwd == cryptr.decrypt(items[0].acntPwd) ) {
                        request.session.isUserLoggedin = true;
                        request.session.userId = request.body.uid;
                        data.msg = 'Valid'; 
                    }else {
                        request.session.isUserLoggedin = false;
                        data.msg = 'Invalid';
                    }
                    console.log("request.session.isUserLoggedin -< " + request.session.isUserLoggedin);
                    response.send(JSON.stringify(data));
                }
            });
        }
    });    
});

module.exports = router;