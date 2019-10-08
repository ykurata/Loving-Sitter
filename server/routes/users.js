<<<<<<< HEAD
var express = require("express");
var router = express.Router();

router.get("/users", function(req, res, next) {
  res.status(200).send({ userMessage: "Preparing to create user route." });
=======
import express from "express";
import User from "../models/User";
import validator from "validator";
var router = express.Router();

router.post("/register", async function(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // first validate credentials
  if (!name) {
    res.status(400).json({ error: "Name is required" });
    next();
  }
  if (!email) {
    res.status(400).json({ error: "Email is required" });
    next();
  }
  if (!validator.isEmail(email)) {
    res.status(400).json({ error: "Incorrect email format" });
    next();
  }
  if (!password) {
    res.status(400).json({ error: "Password is required" });
    next();
  }
  if (password !== confirmPassword) {
    res.status(400).json({ error: "Passwords do not match" });
    next();
  }
  // regex to test if a string contains a number
  const regex = RegExp(".*\\d.*");

  if (!regex.test(password) || password.length < 8) {
    res.status(400).json({
      error:
        "Password has to contain a number and be at least 8 characters long"
    });
    next();
  }

  // if credentials are valid see if user already exists
  var user = await User.findOne({ email: email });
  if (user) {
    res.status(409).json({ error: "User already exists" });
    next();
  } else {
    user = new User({
      name,
      email
    });
  }

  // setPassword() is a function defined in the userSchema
  await user.setPassword(password);
  await user.save();

  // now login the user
  const payload = {
    id: user._id,
    name: user.name
  };

  const token = user.generateToken(payload);

  if (token) {
    res.json({ token: "Bearer " + token });
  } else {
    res.status(401).json({ error: "Login failed" });
  }
});

//login router

router.post("/login", async function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  var user = await User.findOne({ email: email });
  if (!user) {
    res.status(404).json({ error: "User not found" });
  }

  var validPass = await user.checkPassword(password);
  if (!validPass) {
    res.status(401).json({ error: "Password is incorrect" });
  }

  const payload = {
    id: user._id,
    name: user.name
  };

  const token = user.generateToken(payload);

  if (token) {
    res.json({ token: token });
  } else {
    res.status(401).json({ error: "Login failed" });
  }
>>>>>>> dev
});

module.exports = router;
