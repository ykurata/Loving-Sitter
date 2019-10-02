var express = require("express");
var router = express.Router();
var profile_controller = require("../controllers/profileController");

router.get("/users", function(req, res, next) {
  res.status(200).send({ userMessage: "Preparing to create user route." });
});

module.exports = router;
