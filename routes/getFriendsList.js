var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017';

/* GET home page. */
router.post('/', function (req, res, next) {
    var data = { msg: 'success' };
    mongoClient.connect(url, (error, client) => {
        if (error) {
            data.msg = "Error while communicating with db";
        } else {
            var db = client.db("socialDen_app");
            var collection = db.collection("user_friendsList");
            collection.find({ userId: req.body.uid }).toArray((err, items) => {
                if (items.length > 0) {
                    data.msg = 'Got the friends list';
                    data.responseList = items[0]['friends'];
                    console.log(data);
                    data = JSON.stringify(data);
                    res.send(data);
                } else {
                    data.msg = 'Error while fetching friends';
                    data = JSON.stringify(data);
                    res.send(data);
                }
            });
        }
    })
});

module.exports = router;

// Below is the sample for storing users<=>friends in mongodb table
// {
// 	"_id": {
// 		"$oid": "616d76cfe8cbade311d82455"
// 	},
// 	"userId": "prasad_user",
// 	"friends": [
// 		{
// 			"name": "Musthafa",
// 			"age": 20,
// 			"gender": "Male",
// 			"profilePic": "https://variety.com/wp-content/uploads/2021/05/Friends-The-Reunion.jpg",
// 			"photos": [],
// 			"user_Id": "muf_test"
// 		},
// 		{
// 			"name": "Krish",
// 			"age": 20,
// 			"gender": "Male",
// 			"profilePic": "https://www.photodoozy.com/uploads/most-cute-and-stylish-boy-dp-pic-for-fb-photodoozy.jpg",
// 			"photos": []
// 		},
// 		{
// 			"name": "Teena",
// 			"age": 23,
// 			"gender": "Female",
// 			"profilePic": "https://www.whatsappprofiledpimages.com/wp-content/uploads/2019/08/Dp-For-Sad-Girls-Fb-Images-9.jpg",
// 			"photos": []
// 		},
// 		{
// 			"name": "Raj",
// 			"age": 30,
// 			"gender": "Male",
// 			"profilePic": "https://www.theattitudequotes.com/wp-content/uploads/2021/03/fb-dp-for-boy_38.jpg",
// 			"photos": []
// 		},
// 		{
// 			"name": "Angileena",
// 			"age": 26,
// 			"gender": "Female",
// 			"profilePic": "https://techtrickseo.com/wp-content/uploads/2018/01/stylish-girl-cool-dp-fb.jpg",
// 			"photos": []
// 		}
// 	]
// }

/////////////////////////Old code ///////////////////////

// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.post('/', function(req, res, next) {
//     var friendsList = {
//         'prasad_user': [
//             {
//                 name: 'Musthafa',
//                 age: 20,
//                 gender: 'Male',
//                 profilePic: 'https://variety.com/wp-content/uploads/2021/05/Friends-The-Reunion.jpg',
//                 photos: [],
//                 user_Id: 'muf_test'
//             },
//             {
//                 name: 'Krish',
//                 age: 20,
//                 gender: 'Male',
//                 profilePic: 'https://www.photodoozy.com/uploads/most-cute-and-stylish-boy-dp-pic-for-fb-photodoozy.jpg',
//                 photos: []
//             }, {
//                 name: 'Teena',
//                 age: 23,
//                 gender: 'Female',
//                 profilePic: 'https://www.whatsappprofiledpimages.com/wp-content/uploads/2019/08/Dp-For-Sad-Girls-Fb-Images-9.jpg',
//                 photos: []
//             },
//             {
//                 name: 'Raj',
//                 age: 30,
//                 gender: 'Male',
//                 profilePic: 'https://www.theattitudequotes.com/wp-content/uploads/2021/03/fb-dp-for-boy_38.jpg',
//                 photos: []
//             },
//             {
//                 name: 'Angileena',
//                 age: 26,
//                 gender: 'Female',
//                 profilePic: 'https://techtrickseo.com/wp-content/uploads/2018/01/stylish-girl-cool-dp-fb.jpg',
//                 photos: []
//             }
//         ],
//         'user_new': []
//     };
//     var data = {};

//     var userId = req.body.uid;
//     console.log(req.body);
//     if (userId) {
//         data.responseList = friendsList[userId];
//     } else {
//         data.msg = 'Invalid User Id';
//     }
//     data = JSON.stringify(data);
//     res.send(data);
// });

// module.exports = router;
