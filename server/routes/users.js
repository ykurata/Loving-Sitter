import express from "express";
import User from "../models/User";
const router = express.Router();

// Load input validation
const validateRegisterInput = require("../validator/register");
const validateLoginInput = require("../validator/login");

router.post("/register", async function(req, res, next) {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  // if credentials are valid see if user already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  } else {
    return res.status(400).json({ error: "Email already exists" });
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
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: "Login failed" });
  }
});


router.post("/login", async function(req, res, next) {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const validPass = await user.checkPassword(password);
  if (!validPass) {
    return res.status(401).json({ error: "Password is incorrect" });
  }

  const payload = {
    id: user._id,
    name: user.name
  };

  const token = user.generateToken(payload);

  if (token) {
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: "Login failed" });
  }
});

module.exports = router;


