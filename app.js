require("dotenv/config");
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();
require("./config")(app);
const capitalized = require("./utils/capitalized");
const projectName = "second-project";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

const session = require('express-session')
const MongoStore = require('connect-mongo')

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
		resave: true,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URI
		})
	})
)

const index = require("./routes/index");
app.use("/", index);

const authRouter = require("./routes/auth");
app.use("/", authRouter);

const roomRouter = require("./routes/rooms");
app.use("/", roomRouter);

app.use(express.static(__dirname + "/public"));

require("./error-handling")(app);

module.exports = app;
