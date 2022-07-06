const router = require("express").Router();
const Room = require("../models/Room");
const fileUploader = require("../config/cloudinary.config");

router.get('/add-room', (req, res, next) => {
    res.render('rooms/add')
});

router.post('/add-room', fileUploader.array("room-images", 3), async (req, res, next) => {
    const { title, rent, startDate, endDate, sqr, postalCode, street, district, description } = req.body
    const userId = req.session.currentUser._id
   // const imageUrl = [];
    const imageUrl = req.files.map(file => file.path)
    
    Room.create({ title, rent, startDate, endDate, sqr, postalCode, street, district, description, imageUrl, owner: userId })
        .then(roomFromDB => {
            //console.log(room)
            res.redirect(`/detail-room/${roomFromDB._id}`)
        })
        .catch(err => {
            next(err)
        })
});

router.get('/detail-room/:id', (req, res, next) => {
    const roomId = req.params.id
    console.log(req.params.id)

    Room.findById(roomId)
        .then(roomsFromDB => {
            res.render('rooms/detail', { oneRoomData: roomsFromDB })
            console.log(roomsFromDB.imageUrl[0])
        })
        .catch(err => {
            next(err)
        })
})



router.get("/detail-room", (req, res, next) => {
  res.render("rooms/detail");
});

router.get("/all-rooms", (req, res, next) => {
  Room.find()
    .then((roomsFromDb) => {
      console.log(roomsFromDb);
      res.render("rooms/index", { roomsFromDb });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
