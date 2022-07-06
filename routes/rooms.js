const router = require("express").Router();
const Room = require('../models/Room')
const fileUploader = require('../config/cloudinary.config');


router.get('/add-room', (req, res, next) => {
    res.render('rooms/add')
});

router.post('/add-room', fileUploader.single('room-image'), (req, res, next) => {
    const { title, rent, startDate, endDate, sqr, postalCode, street, district, description } = req.body
    const imageUrl = req.file.path
    const userId = req.session.currentUser._id
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



module.exports = router;
