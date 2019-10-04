var express = require("express");
var router = express.Router();

router.post("/picture", function (req, res, next) {

    res.status(400).send({
        response: `Testing`
    });
});

module.exports = router;
