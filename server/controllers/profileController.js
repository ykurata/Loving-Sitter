//Needs to create the profile models later
import Profile from "../models/profile";

import { body, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

// TESTING
// Display list of all profiles.
exports.profile_list = function (req, res, next) {

    Profile.find({}, 'id ')
        .populate('firstName')
        .exec(function (err, list_profiles) {
            if (err) { return next(err); }
            // Successful, so render
            res.render('profile_list', { title: 'Profile List', profile_list: list_profiles });
        });

};

// TESTING
// Display detail page for a specific profile.
exports.profile_detail = function (req, res, next) {

    async.parallel({
        profile: function (callback) {

            Profile.findById(req.params.id)
                .populate('firstName')
                .populate('lastName')
                .populate('gender')
                .populate('lastName')
                .populate('birthDate')
                .populate('email')
                .populate('phone')
                .populate('location')
                .populate('description')
                .exec(callback);
        },
        profile_instance: function (callback) {

            ProfileInstance.find({ 'profile': req.params.id })
                .exec(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.profile == null) { // No results.
            var err = new Error('Profile not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('profile_detail', { title: 'Profile', profile: results.profile, profile_instances: results.profile_instance });
    });

};

// Handle profile create on POST.
module.exports.profile_create_post = function (req, res, next) {

    // Validate fields.
    body('firstName', 'First Name must not be empty.').isLength({ min: 1 }).trim(),
        body('lastName', 'Last Name must not be empty.').isLength({ min: 1 }).trim(),
        body('gender', 'Gender must not be empty.').isLength({ min: 1 }).trim(),
        body('birthDate', 'Birth date must not be empty').isLength({ min: 1 }).trim(),
        body('email', 'Email must not be empty').isLength({ min: 1 }).trim(),
        body('phone', 'Phone must not be empty').isLength({ min: 1 }).trim(),
        body('location', 'Location must not be empty').isLength({ min: 1 }).trim(),
        body('description', 'Description must not be empty').isLength({ min: 1 }).trim(),

        // Sanitize fields.
        sanitizeBody('firstName').escape(),
        sanitizeBody('lastName').escape(),
        sanitizeBody('gender').escape(),
        sanitizeBody('birthDate').escape(),
        sanitizeBody('email').escape(),
        sanitizeBody('phone').escape(),
        sanitizeBody('location').escape(),
        sanitizeBody('description').escape(),
        // Process request after validation and sanitization.

        // Extract the validation errors from a request.
        errors = validationResult(req);

    // Create a Profile object with escaped and trimmed data.
    var profile = new Profile(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            birthDate: req.body.birthDate,
            email: req.body.email,
            phone: req.body.phone,
            location: req.body.location,
            description: req.body.description
        });

    if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.

        // CREATE ERROR RESPONSE
        console.log("You have errors in your form");
        console.log(errors);
        res.render('profile_form', { title: 'Create Profile', firstName: results.firstName, lastName: results.lastName, gender: results.gender, birthDate: results.birthDate, phone: results.phone, location: results.location, description: results.description });
    }
    else {
        console.log("Attempting Profile Saving");

        // Data from form is valid. Save profile.
        profile.save(function (err) {
            if (err) { 
                return next(err); 
            }

            // Successful - redirect to new profile record.
            res.redirect(profile.url);
        });
    }

};



// Display profile delete form on GET.
exports.profile_delete_get = function (req, res, next) {

    async.parallel({
        profile: function (callback) {
            Profile.findById(req.params.id).populate('firstName').populate('lastName').exec(callback);
        },
        profile_profileinstances: function (callback) {
            ProfileInstance.find({ 'profile': req.params.id }).exec(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.profile == null) { // No results.
            res.redirect('/catalog/profiles');
        }
        // Successful, so render.
        res.render('profile_delete', { title: 'Delete Profile', profile: results.profile, profile_instances: results.profile_profileinstances });
    });

};

// TESTING
// Handle profile delete on POST.
exports.profile_delete_post = function (req, res, next) {

    // Assume the post has valid id (ie no validation/sanitization).

    async.parallel({
        profile: function (callback) {
            Profile.findById(req.body.id).populate('firstName').populate('lastName').exec(callback);
        },
        profile_profileinstances: function (callback) {
            ProfileInstance.find({ 'profile': req.body.id }).exec(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        // Success
        if (results.profile_profileinstances.length > 0) {
            // Profile has profile_instances. Render in same way as for GET route.
            res.render('profile_delete', { title: 'Delete Profile', profile: results.profile, profile_instances: results.profile_profileinstances });
            return;
        }
        else {
            // Profile has no ProfileInstance objects. Delete object and redirect to the list of profiles.
            Profile.findByIdAndRemove(req.body.id, function deleteProfile(err) {
                if (err) { return next(err); }
                // Success - got to profiles list.
                res.redirect('/catalog/profiles');
            });

        }
    });

};

// NEEDS FIXING
// Display profile update form on GET.
exports.profile_update_get = function (req, res, next) {

    // Get profile, firstNames and lastNames for form.
    async.parallel({
        profile: function (callback) {
            Profile.findById(req.params.id).populate('firstName').populate('lastName').exec(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.profile == null) { // No results.
            var err = new Error('Profile not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        // Mark our selected lastNames as checked.
        for (var all_g_iter = 0; all_g_iter < results.lastNames.length; all_g_iter++) {
            for (var profile_g_iter = 0; profile_g_iter < results.profile.lastName.length; profile_g_iter++) {
                if (results.lastNames[all_g_iter]._id.toString() == results.profile.lastName[profile_g_iter]._id.toString()) {
                    results.lastNames[all_g_iter].checked = 'true';
                }
            }
        }
        res.render('profile_form', { title: 'Update Profile', firstNames: results.firstNames, lastNames: results.lastNames, profile: results.profile });
    });

};

// NEEDS FIXING
// Handle profile update on POST.
exports.profile_update_post = [

    // Validate fields.
    body('firstName', 'First Name must not be empty.').isLength({ min: 1 }).trim(),
    body('lastName', 'Last Name must not be empty.').isLength({ min: 1 }).trim(),
    body('gender', 'Gender must not be empty.').isLength({ min: 1 }).trim(),
    body('birthDate', 'Birth date must not be empty').isLength({ min: 1 }).trim(),
    body('email', 'Email must not be empty').isLength({ min: 1 }).trim(),
    body('phone', 'Phone must not be empty').isLength({ min: 1 }).trim(),
    body('location', 'Location must not be empty').isLength({ min: 1 }).trim(),
    body('description', 'Description must not be empty').isLength({ min: 1 }).trim(),

    // Sanitize fields.
    sanitizeBody('firstName').escape(),
    sanitizeBody('lastName').escape(),
    sanitizeBody('gender').escape(),
    sanitizeBody('birthDate').escape(),
    sanitizeBody('email').escape(),
    sanitizeBody('phone').escape(),
    sanitizeBody('location').escape(),
    sanitizeBody('description').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Profile object with escaped/trimmed data and old id.
        var profile = new Profile(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                birthDate: req.body.birthDate,
                email: req.body.email,
                phone: req.body.phone,
                location: req.body.location,
                description: req.body.description,
                _id: req.params.id // This is required, or a new ID will be assigned!
            });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all firstNames and lastNames for form
            async.parallel({
                id: function (callback) {
                    Profile.find(callback);
                },
            }, function (err, results) {
                if (err) { return next(err); }

                // Mark our selected lastNames as checked.
                for (let i = 0; i < results.lastNames.length; i++) {
                    if (profile.lastName.indexOf(results.lastNames[i]._id) > -1) {
                        results.lastNames[i].checked = 'true';
                    }
                }
                res.render('profile_form', { title: 'Update Profile', firstNames: results.firstNames, lastNames: results.lastNames, profile: profile, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Profile.findByIdAndUpdate(req.params.id, profile, {}, function (err, profile) {
                if (err) { return next(err); }
                // Successful - redirect to profile detail page.
                res.redirect(profile.url);
            });
        }
    }
];