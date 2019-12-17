import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";
import cors from "cors";

// import routes
import profileRouter from "./routes/profile";
import requestRouter from "./routes/request";
import usersRouter from "./routes/users";
import fileUploadRouter from "./routes/file-upload";
import paymentRouter from "./routes/payment";
import conversationRouter from "./routes/conversation";

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(join(__dirname, "public")));

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
