var express = require("express");
var router = express.Router();

var profile_controller = require("../controllers/profileController");

router.post("/", profile_controller.createOrUpdateProfile);
router.post("/getProfile", profile_controller.getProfile);

module.exports = router;
