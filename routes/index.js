const User = require("../models/User");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* create profile */
router.get("/add-profile", (req, res, next) => {
  res.render("add-profile");
});

router.post("/add-profile", (req, res, next) => {
  const { gender, phoneNumber, city, birthday } = req.body;
  console.log(req.body)
  //console.log(req.session.currentUser)
  const userId = req.session.currentUser._id
  User.findByIdAndUpdate(userId,{ gender, phoneNumber, city, birthday })
    .then(() => {
      res.redirect("/rooms/index");
    })
    .catch((err) => {
      next(err);
    });
});




module.exports = router;
