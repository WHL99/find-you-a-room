const router = require("express").Router();
const Room = require('../models/Room')
const fileUploader = require('../config/cloudinary.config');


router.get('/add-room', (req, res, next) => {
	res.render('rooms/add')
});

router.post('/add-room',fileUploader.single('room-image'), (req, res, next) => {
	const { title, rent,postalCode ,address ,description} = req.body
	//console.log(req.user)
    const imageUrl = req.file.path
	const userId = req.session.currentUser._id
	Room.create({ title, rent,postalCode ,address ,description,imageUrl, owner: userId })
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







// router.get('/:id/delete', (req, res, next) => {
// 	const roomId = req.params.id
// 	const query = { _id: roomId }
// 	if (req.user.role === 'user') {
// 		query.owner = req.user._id
// 		// now the query would look like this:
// 		// { _id: roomId, owner: req.user._id }
// 	}
// 	Room.findOneAndDelete(query)
// 		.then(() => {
// 			res.redirect('/rooms')
// 		})
// 		.catch(err => {
// 			next(err)
// 		})
// });


module.exports = router;
