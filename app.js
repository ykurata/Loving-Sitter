const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
const mongoose = require("mongoose");

// import routes
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const usersRouter = require("./routes/users");
const fileUploadRouter = require("./routes/file-upload");
const paymentRouter = require("./routes/payment");
const conversationRouter = require("./routes/conversation");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up mondoDB connection
mongoose.connect("mongodb://localhost:27017/loving-sitter");

const db = mongoose.connection;

db.on("error", function(err){
  console.error("connection error:", err);
});

db.once("open", function(){
  console.log("db connection successful");
});


app.use(passport.initialize());
require("./libs/passport")(passport);

// Set up routes
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/users", usersRouter);
app.use("/files", fileUploadRouter);
app.use("/payment", paymentRouter);
app.use("/conversation", conversationRouter);

// Set up cors 
app.use(cors());

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFild(path.resolve(__dirname, 'client/build', 'index.html'));
  });
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
