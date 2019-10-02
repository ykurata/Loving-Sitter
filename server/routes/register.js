import express from "express";
import User from "./../models/User";
var router = express.Router();


router.get("/register", async function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	// first validate credentials
	if (!email) {
		res.status(400).json({error: "Email is required"});
	}
	if (!password) {
		res.status(400).json({error: "Password is required"});
	}
	// regex to test if a string contains a number
	const regex = RegExp(".*\\d.*");

	if (!regex.test(password) || password.length < 8) {
		res.status(400).json({error: "Password has to contain a number and be at least 8 characters long"});
	}
    
    // if credentials are valid see if user already exists
	var user = await User.findOne({email: email});
	if (user) {
		res.status(409).json({error: "User already exists"});
	} 
	else {
		user = new User({
			email: email
		});
	}

	// setPassword() is a function defined in the userSchema
	await user.setPassword(password);
	await user.save();

});

module.exports = router;