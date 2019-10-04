var express = require("express");
var router = express.Router();

var profile_controller = require('../controllers/profileController');

router.post('/', profile_controller.profile_create_post);

module.exports = router;
