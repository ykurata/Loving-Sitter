const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config");
const router = express.Router();

const User = require("../models/User");

// Load input validation
const validateRegisterInput = require("../validator/register");
const validateLoginInput = require("../validator/login");

router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // if credentials are valid see if user already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // setPassword() is a function defined in the userSchema
    await newUser.setPassword(req.body.password);
    await newUser.save();

    // now login the user
    const payload = {
      id: newUser._id,
      name: newUser.name
    };

    const token = newUser.generateToken(payload);

    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Login failed" });
    }
  } else {
    return res.status(400).json({ error: "Email already exists" });
  }
});


router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              token: token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ error: "Password incorrect" });
      }
    });
  });
});


module.exports = router;


