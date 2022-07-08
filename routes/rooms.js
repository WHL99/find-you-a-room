const router = require("express").Router();
const Room = require("../models/Room");
const fileUploader = require("../config/cloudinary.config");

router.get("/add-room", (req, res, next) => {
    res.render("rooms/add");
});

router.post(
    "/add-room",
    fileUploader.array("room-images", 5),
    async (req, res, next) => {
        const {
            title,
            rent,
            startDate,
            endDate,
            sqr,
            postalCode,
            street,
            district,
            city,
            description,
        } = req.body;
        const userId = req.session.currentUser._id;
        // const imageUrl = [];
        const imageUrl = req.files.map((file) => file.path);
        Room.create({
            title,
            rent,
            startDate,
            endDate,
            sqr,
            postalCode,
            street,
            district,
            city,
            description,
            imageUrl,
            owner: userId,
        })
            .then((roomFromDB) => {
                //console.log(room)
                res.redirect(`/detail-room/${roomFromDB._id}`);
            })
            .catch((err) => {
                 next(err);
            });
    })



router.get('/detail-room/:id', (req, res, next) => {
    const roomId = req.params.id
    console.log(req.params.id)

    Room.findById(roomId)
        .populate('owner')
        .then(roomsFromDB => {
            roomsFromDB.formatStartDate = roomsFromDB.startDate.toDateString().slice(4)
            roomsFromDB.formatEndDate = roomsFromDB.endDate.toDateString().slice(4)
            //console.log(roomsFromDB.formatEndDate)
            res.render('rooms/detail', { oneRoomData: roomsFromDB })
        })
        .catch(err => {
            next(err)
        })
})


router.get("/all-rooms/:id", (req, res, next) => {
    const roomId = req.params.id;
    console.log(req.params.id);

    Room.findById(roomId)
        .populate('owner')
        .then(roomsFromDB => {
            roomsFromDB.formatStartDate = roomsFromDB.startDate.toDateString().slice(4)
            roomsFromDB.formatEndDate = roomsFromDB.endDate.toDateString().slice(4)
            //console.log(roomsFromDB.formatEndDate)
            res.render('rooms/detail', { oneRoomData: roomsFromDB })
        })
        // .then((roomsFromDB) => {
        //     res.render("rooms/detail", { oneRoomData: roomsFromDB });
        //     console.log(roomsFromDB.imageUrl[0]);
        // })
        .catch((err) => {
            next(err);
        });
});

router.get("/all-rooms", (req, res, next) => {
    Room.find()
        .then((roomsFromDb) => {
            //wen add here for format date
            const formatDateRooms = roomsFromDb.map(function (room) {
                room.formatStartDate = room.startDate.toDateString().slice(4)
                room.formatEndDate = room.endDate.toDateString().slice(4)
                console.log(room.formatEndDate)
                return room
            })
            res.render("rooms/index-select-rooms-by-city", { roomsFromDb: formatDateRooms });
            //
        })
        .catch((err) => {
            next(err);
        });
});

router.get("/detail-room", (req, res, next) => {
    res.render("rooms/detail");
});

module.exports = router;
