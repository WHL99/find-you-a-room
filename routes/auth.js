const router = require("express").Router();
const User = require("../models/User");
const Room = require("../models/Room");
const bcryptjs = require("bcryptjs");

router.get("/signup", (req, res, next) => {
  res.render("signup");
  // console.log("signup get test");
});

router.post("/signup", (req, res, next) => {
  const { email, firstName, lastName, password, checkPassword } = req.body;
  console.log(req.body)
  if (password.length < 4) {
    res.render("signup", {
      errorMessage: "Your password needs to be min 4 chars",
    });
    return;
  }
  if (email.length === 0) {
    res.render("signup", { errorMessage: "Your email cannot be empty" });
    return;
  }
  if (password !== checkPassword) {
    res.render("signup", { errorMessage: "Your passwords are not match!" });
    return;
  }

  User.findOne({ email: email }).then((userFromDB) => {
    if (userFromDB !== null) {
      res.render("signup", { errorMessage: "Email is already taken" });
    } else {
      const salt = bcryptjs.genSaltSync();
      const hash = bcryptjs.hashSync(password, salt);
      User.create({
        email,
        firstName,
        lastName,
        passwordHash: hash,
      })
        .then((createdUser) => {
          console.log(createdUser);
          res.redirect("/login");
        })
        .catch((err) => next(err));
    }
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  console.log(email);

  if (email === "" || password === "") {
    res.render("login", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({ email })

    .then((user) => {
      if (!user) {
        res.render("login", {
          errorMessage: "Email is not registered. Try with other email.",
        });
        return;
        //first time login, add profile
      } else if (!user.city && bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        res.redirect("/add-profile");
      }
      //if the profile is added, go to index
      else if (user.city && bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        res.redirect("/rooms/index");
      }
      else {
        res.render("login", { errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => next(error));
});

router.get("/rooms/index", (req, res) => {
  res.render("rooms/index");
});

module.exports = router;
