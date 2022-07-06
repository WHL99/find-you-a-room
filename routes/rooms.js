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

const cloudinaryImageUploadMethod = async file => {
    return new Promise(resolve => {
        fileUploader.upload(file, (err, res) => {
            if (err) return res.status(500).send("upload image error")
            resolve({
                res: res.secure_url
            })
        }
        )
    })
}


router.post('/add-room', fileUploader.array("room-images", 3), async (req, res, next) => {
    console.log('你好你好你你')
    const { title, rent, startDate, endDate, sqr, postalCode, street, district, description } = req.body
    const userId = req.session.currentUser._id
    const imageUrl = [];
    // console.log('你好你好你你')
    const files = req.files;
    for (const file of files) {
        const { path } = file;
        const newPath = await cloudinaryImageUploadMethod(path);
        imageUrl.push(newPath);
    }
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
