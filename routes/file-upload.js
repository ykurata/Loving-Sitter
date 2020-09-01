const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile");
const authenticate = require("./utils/auth");
const upload = require("../services/image-upload");

const singleUpload = upload.single("image");

router.post("/image-upload", authenticate, function (req, res, err) {
  singleUpload(req, res, async function (err) {
    if (err) {
      console.log(err);
    }

    let user = await Profile.findOne({ userId: req.user });
    if (user) {
      user.photoUrl = req.file.location;
      await user.save();
    } else {
      return res.status(404).send({ error: "User profile not found" });
    }

    return res.status(200).json({ imageUrl: req.file.location });
  });
});

module.exports = router;
