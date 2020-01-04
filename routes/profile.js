const express = require("express");
const router = express.Router();
const authenticate = require("./utils/auth");
const Profile = require("../models/Profile");
const validateProfileInput = require("../validator/profile-validator");

// Post a profile (new profile)
router.post("/create", authenticate, function(req, res, next) {
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
        res.json(profile);
    });
});

// Update a specific profile 
router.put("/update/:id", authenticate, (req, res, next) => {
    // Form validation
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({userId: req.params.id}, function(err, profile) {
        if (err) return next(err);
        profile.firstName = req.body.firstName,
        profile.lastName = req.body.lastName,
        profile.gender = req.body.gender,
        profile.email = req.body.email,
        profile.birthDate = req.body.birthDate,
        profile.phone = req.body.phone,
        profile.address = req.body.address,
        profile.description = req.body.description,
        profile.rate = req.body.rate,
    
        profile.save(function(err, profile) {
          if (err) return next(err);
          res.status(200).json(profile);
        });
    });
});

// Get all profiles 
router.get("/get", authenticate, (req, res) => {
    Profile.find({}, (err, profiles) => {
        if (err) {
          res.status(404).json({ error: "No profiles found" });
        } else {
          res.status(200).json({ profile: profiles });
        }
    });
});

// Get a specific profile 
router.get("/get/:id", authenticate,(req, res, next) => {
    Profile.findOne({ userId: req.params.id }, (err, profile) => {
        if (err) {
            res.status(404).json({ error: "Profile not found" });
        } else {
            res.status(200).json({ profile });
        }
    });
});

// Delete a profile
router.delete("/delete/:profile_id", authenticate, function(req, res, next) {
    Profile.remove({ _id: req.params.profile_id}, function(err, profile){
        if (err) return next(err);
        res.json({ message: "successfully deleted" });
    });
});

module.exports = router;
