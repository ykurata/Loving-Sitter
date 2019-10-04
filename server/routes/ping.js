var express = require("express");
var router = express.Router();

var profile_controller = require('../controllers/profileController');

/*router.post("/", function(req, res, next) {
  const teamName = req.body.teamName;

  if (
    teamName &&
    process.env.TEAM_NAME &&
    process.env.TEAM_NAME.indexOf(teamName) >= 0
  )
    res.status(200).send({ response: `${teamName} is part of the team!` });
  else
    res.status(400).send({
      response: `${teamName} is not part of the team. Modify your .env`
    });
});*/

router.post('/profile', profile_controller.profile_create_post);

module.exports = router;
