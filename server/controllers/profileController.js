//Needs to create the profile models later
import Profile from "../models/Profile";
import mongoose from "mongoose";

import { body, validationResult } from "express-validator/check";
import { sanitizeBody } from "express-validator/filter";


// import input validation
const validateProfileInput = require("../validator/profile-validator");

// TESTING
// Display list of all profiles.
exports.profile_list = function(req, res, next) {
  Profile.find({}, "id ")
    .populate("firstName")
    .exec(function(err, list_profiles) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("profile_list", {
        title: "Profile List",
        profile_list: list_profiles
      });
    });
};

// TESTING
// Display detail page for a specific profile.
exports.profile_detail = function(req, res, next) {
  async.parallel(
    {
      profile: function(callback) {
        Profile.findById(req.params.id)
          .populate("firstName")
          .populate("lastName")
          .populate("gender")
          .populate("lastName")
          .populate("birthDate")
          .populate("email")
          .populate("phone")
          .populate("location")
          .populate("description")
          .exec(callback);
      },
      profile_instance: function(callback) {
        ProfileInstance.find({ profile: req.params.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.profile == null) {
        // No results.
        var err = new Error("Profile not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("profile_detail", {
        title: "Profile",
        profile: results.profile,
        profile_instances: results.profile_instance
      });
    }
  );
};

// Handle profile create on POST.
module.exports.createOrUpdateProfile = function(req, res, next) {
  // Form validation
  const { errors, isValid } = validateProfileInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profile =  new Profile({
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

  profile.save(function(err, profile){
    if (err) return next(err);
    console.log("USER SAVED!");
    res.json(profile);
  });
};


//Handle profile update on POST.
module.exports.profileUpdatePost = function(req, res, next) {
  // Form validation
  const { errors, isValid } = validateProfileInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findById(req.params.id, function(err, profile){
    if (err) return next(err);
    profile.firstName = req.body.firstName,
    profile.lastName = req.body.lastName,
    profile.gender = req.body.gender,
    profile.email = req.body.email,
    profile.birthDate = req.body.birthDate,
    profile.phone = req.body.phone,
    profile.address = req.body.address,
    profile.description = req.body.description,
    profile.rate = req.body.rate

    profile.save(function(err, profile){
      if (err) return next(err);
      res.json(profile);
    });
  });
}
 


module.exports.getProfile = async function(req, res, next) {
  if (mongoose.Types.ObjectId.isValid(req.body.userId)) {
    let profile = await Profile.findOne(
      { userId: req.body.userId },
      (err, profile) => {
        if (err) {
          res.status(404).json({ error: "Profile not found" });
        } else {
          res.status(200).json({ profile: profile });
        }
      }
    );
  } else {
    res.status(404).json({ error: "Invalid user ID" });
  }
};
// Display profile delete form on GET.
exports.profile_delete_get = function(req, res, next) {
  async.parallel(
    {
      profile: function(callback) {
        Profile.findById(req.params.id)
          .populate("firstName")
          .populate("lastName")
          .exec(callback);
      },
      profile_profileinstances: function(callback) {
        ProfileInstance.find({ profile: req.params.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.profile == null) {
        // No results.
        res.redirect("/catalog/profiles");
      }
      // Successful, so render.
      res.render("profile_delete", {
        title: "Delete Profile",
        profile: results.profile,
        profile_instances: results.profile_profileinstances
      });
    }
  );
};

// TESTING
// Handle profile delete on POST.
exports.profile_delete_post = function(req, res, next) {
  // Assume the post has valid id (ie no validation/sanitization).

  async.parallel(
    {
      profile: function(callback) {
        Profile.findById(req.body.id)
          .populate("firstName")
          .populate("lastName")
          .exec(callback);
      },
      profile_profileinstances: function(callback) {
        ProfileInstance.find({ profile: req.body.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      // Success
      if (results.profile_profileinstances.length > 0) {
        // Profile has profile_instances. Render in same way as for GET route.
        res.render("profile_delete", {
          title: "Delete Profile",
          profile: results.profile,
          profile_instances: results.profile_profileinstances
        });
        return;
      } else {
        // Profile has no ProfileInstance objects. Delete object and redirect to the list of profiles.
        Profile.findByIdAndRemove(req.body.id, function deleteProfile(err) {
          if (err) {
            return next(err);
          }
          // Success - got to profiles list.
          res.redirect("/catalog/profiles");
        });
      }
    }
  );
};

// NEEDS FIXING
// Display profile update form on GET.
exports.profile_update_get = function(req, res, next) {
  // Get profile, firstNames and lastNames for form.
  async.parallel(
    {
      profile: function(callback) {
        Profile.findById(req.params.id)
          .populate("firstName")
          .populate("lastName")
          .exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.profile == null) {
        // No results.
        var err = new Error("Profile not found");
        err.status = 404;
        return next(err);
      }
      // Success.
      // Mark our selected lastNames as checked.
      for (
        var all_g_iter = 0;
        all_g_iter < results.lastNames.length;
        all_g_iter++
      ) {
        for (
          var profile_g_iter = 0;
          profile_g_iter < results.profile.lastName.length;
          profile_g_iter++
        ) {
          if (
            results.lastNames[all_g_iter]._id.toString() ==
            results.profile.lastName[profile_g_iter]._id.toString()
          ) {
            results.lastNames[all_g_iter].checked = "true";
          }
        }
      }
      res.render("profile_form", {
        title: "Update Profile",
        firstNames: results.firstNames,
        lastNames: results.lastNames,
        profile: results.profile
      });
    }
  );
};



  