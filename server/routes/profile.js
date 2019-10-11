var express = require("express");
var router = express.Router();
const authenticate = require("./utils/auth");

var profile_controller = require("../controllers/profileController");

router.post("/", authenticate, profile_controller.createOrUpdateProfile);
router.post("/getProfile", profile_controller.getProfile);
router.put('/update/:id', authenticate, profile_controller.profileUpdatePost);

module.exports = router;
