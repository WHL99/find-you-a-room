const User = require("../models/User");
const router = require("express").Router();
const Room = require("../models/Room");
const fileUploader = require('../config/cloudinary.config');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* create profile */
router.get("/add-profile", (req, res, next) => {
  res.render("add-profile");
});

router.post("/add-profile", fileUploader.single('profile-image'), (req, res, next) => {
  const { gender, phoneNumber, city, birthday } = req.body;
  const imageUrl = req.file.path
  console.log(req.body)
  //console.log(req.session.currentUser)
  const userId = req.session.currentUser._id
  User.findByIdAndUpdate(userId, { gender, phoneNumber, city, birthday, imageUrl })
    .then(() => {
      res.redirect("/profile");
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/profile', (req, res, next) => {
  const userId = req.session.currentUser._id
  User.findById(userId)
    .then(usersFromDB => {
      res.render('profile', { oneUserData: usersFromDB })
    })
    .catch(err => {
      next(err)
    })
})


//select rooms by city
router.get("/room-search", (req, res, next) => {
  Room.find({ city: req.query.searchByCity })
    .then(roomsFromDB => {


      // const theDate = roomsFromDB.map(roomsFromDB.startDate => file.path)
      //console.log(roomsFromDB.startDate)

       if(req.query.searchByCity === ''){
        res.redirect("/all-rooms")
       }



     

      res.render("rooms/select-rooms-by-city", { seeRoomsByCity: roomsFromDB })
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});

module.exports = router;



