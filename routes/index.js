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
  const userId = req.user._id;
  User.create({ gender, phoneNumber, city, birthday, owner: userId })
    .then((user) => {
      console.log(user);
      res.redirect("/rooms/index");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
