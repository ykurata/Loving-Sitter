//Needs to create the profile models later
import Profile from "../models/Profile";
import mongoose from "mongoose";

import { body, validationResult } from "express-validator/check";
import { sanitizeBody } from "express-validator/filter";

// import input profile input validation
const validateProfileInput = require("../validator/profile-validator");

// Handle profile create on POST.
module.exports.createProfile = function(req, res, next) {
  // Form validation
  const { errors, isValid } = validateProfileInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profile = new Profile({
    userId: req.user,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    email: req.body.email,
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    address: req.body.address,
    description: req.body.description,
    rate: req.body.rate
  });

  profile.save(function(err, profile) {
    if (err) return next(err);
    console.log("USER SAVED!");
    res.json(profile);
  });
};

//Handle profile update on POST.
module.exports.updateProfile = function(req, res, next) {
  // Form validation
  const { errors, isValid } = validateProfileInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findById(req.params.id, function(err, profile) {
    if (err) return next(err);
    (profile.firstName = req.body.firstName),
      (profile.lastName = req.body.lastName),
      (profile.gender = req.body.gender),
      (profile.email = req.body.email),
      (profile.birthDate = req.body.birthDate),
      (profile.phone = req.body.phone),
      (profile.address = req.body.address),
      (profile.description = req.body.description),
      (profile.rate = req.body.rate);

    profile.save(function(err, profile) {
      if (err) return next(err);
      res.json(profile);
    });
  });
};

// GET a specific profile
module.exports.getProfile = async function(req, res, next) {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Profile.findOne({ userId: req.params.id }, (err, profile) => {
      if (err) {
        res.status(404).json({ error: "Profile not found" });
      } else {
        res.status(200).json({ profile: profile });
      }
    });
  } else {
    res.status(404).json({ error: "Invalid user ID" });
  }
};

// GET all profiles
module.exports.getAllProfiles = async function(req, res, next) {
  Profile.find({}, (err, profiles) => {
    if (err) {
      res.status(404).json({ error: "No profiles found" });
    } else {
      res.status(200).json({ profile: profiles });
    }
  });
};
