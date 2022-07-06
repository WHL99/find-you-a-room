const router = require("express").Router();
const Room = require('../models/Room')
const fileUploader = require('../config/cloudinary.config');



router.get('/add-room', (req, res, next) => {
    res.render('rooms/add')
});

// correct code
// router.post('/add-room', fileUploader.single('room-image'), (req, res, next) => {
//     const { title, rent, startDate, endDate, sqr, postalCode, street, district, description } = req.body
//     const imageUrl = req.file.path
//     const userId = req.session.currentUser._id
//     Room.create({ title, rent, startDate, endDate, sqr, postalCode, street, district, description, imageUrl, owner: userId })
//         .then(room => {
//             console.log(room)
//             res.redirect('/detail-room')
//         })
//         .catch(err => {
//             next(err)
//         })
// });

//trying




router.post('/add-room', fileUploader.array("room-images", 3), async (req, res, next) => {
    console.log('你好你好你你')
    const { title, rent, startDate, endDate, sqr, postalCode, street, district, description } = req.body
    const userId = req.session.currentUser._id
    const imageUrl = [];
    const files = req.files;
    Room.create({ title, rent, startDate, endDate, sqr, postalCode, street, district, description, imageUrl, owner: userId })
        .then(room => {
            console.log(room)
            res.redirect('/detail-room')
        })
        .catch(err => {
            next(err)
        })
});



router.get('/detail-room', (req, res, next) => {
    res.render('rooms/detail')
});


//
// router.get('/detail-room', (req, res, next) => {

//     const roomId = req.session.currentRoom._id
//     console.log('這個是什麼？？？？')
//       Room.findById(roomId)
//           .then(roomsFromDB => {
//               res.render('rooms/detail', { oneRoomData: roomsFromDB })
//           })
//           .catch(err => {
//               next(err)
//           })
//   })


module.exports = router;
