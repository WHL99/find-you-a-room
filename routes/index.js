const User = require("../models/User");
const router = require("express").Router();
const Room = require("../models/Room");
const fileUploader = require("../config/cloudinary.config");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* create profile */
router.get("/add-profile", (req, res, next) => {
  res.render("add-profile");
});

router.post(
  "/add-profile",
  fileUploader.single("profile-image"),
  (req, res, next) => {
    const { gender, phoneNumber, city, birthday } = req.body;
    const imageUrl = req.file.path;
    console.log(req.body);
    //console.log(req.session.currentUser)
    const userId = req.session.currentUser._id;
    User.findByIdAndUpdate(userId, {
      gender,
      phoneNumber,
      city,
      birthday,
      imageUrl,
    })
      .then(() => {
        res.redirect("/profile");
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.get("/profile", (req, res, next) => {
  const userId = req.session.currentUser._id;
  User.findById(userId)
    .then((usersFromDB) => {
      res.render("profile", { oneUserData: usersFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

//在首頁select rooms by city
router.get("/room-search", (req, res, next) => {
  Room.find({ city: req.query.searchByCity })
    .then((roomsFromDB) => {
      // const theDate = roomsFromDB.map(roomsFromDB.startDate => file.path)
      //console.log(roomsFromDB)
      

      //wen change date format
      const formatDateRooms = roomsFromDB.map(function (room) {
        room.formatStartDate = room.startDate.toDateString().slice(4)
        room.formatEndDate = room.endDate.toDateString().slice(4)
       // console.log(room.formatEndDate)
        return room
      })
      //wen change date format
        if (req.query.searchByCity === "") {
          res.redirect("/all-rooms");
        }
        res.render("rooms/select-rooms-by-city", { seeRoomsByCity: formatDateRooms });
      })
        .catch((err) =>
          console.log("The error while searching artists occurred: ", err)
        );
    });
    //


//0707 18:16 wen is trying to 選完城市之後 點進去看房詳細資訊
    router.get("/room-search/:id", (req, res, next) => {
      const roomId = req.params.id;
      console.log(req.params.id);
  
      Room.findById(roomId)
          .then((roomsFromDB) => {
              res.render("rooms/detail", { oneRoomData: roomsFromDB });
              
          })
          .catch((err) => {
              next(err);
          });
  });
  //0707 18:16 wen is trying to 選完城市之後 點進去看房詳細資訊



//在所有房間頁面select rooms by city
router.get("/room-search-rooms-index", (req, res, next) => {
  Room.find({ city: req.query.searchByCity })
    .then((roomsFromDB) => {
      // const theDate = roomsFromDB.map(roomsFromDB.startDate => file.path)
      //console.log(roomsFromDB)
      

      //wen change date format
      const formatDateRooms = roomsFromDB.map(function (room) {
        room.formatStartDate = room.startDate.toDateString().slice(4)
        room.formatEndDate = room.endDate.toDateString().slice(4)
       // console.log(room.formatEndDate)
        return room
      })
      //wen change date format
       
        res.render("rooms/select-rooms-by-city", { seeRoomsByCity: formatDateRooms });
      })
        .catch((err) =>
          console.log("The error while searching artists occurred: ", err)
        );
    });
    //







  module.exports = router;


