const router = require("express").Router();
const User = require('../models/User')
const Room = require('../models/Room')
const bcrypt = require('bcryptjs')


router.get('/signup', (req, res, next) => {
    res.render('signup')
    console.log('signup get test')
});

router.post('/signup', (req, res, next) => {
    const { email, firstName, lastName, birthday, gender, phoneNumber, password } = req.body
    if (password.length < 4) {
        res.render('signup', { message: 'Your password needs to be min 4 chars' })
        return
    }
    if (email.length === 0) {
        res.render('signup', { message: 'Your email cannot be empty' })
        return
    }

    User.findOne({ email: email })
        .then(userFromDB => {
            if (userFromDB !== null) {
                res.render('signup', { message: 'Email is already taken' })
            } else {
                const salt = bcrypt.genSaltSync()
                const hash = bcrypt.hashSync(password, salt)
                User.create({ email, password: hash })
                    .then(createdUser => {
                        console.log(createdUser)
                        res.redirect('/login')
                    })
                    .catch(err => next(err))
            }
        })
});




module.exports = router