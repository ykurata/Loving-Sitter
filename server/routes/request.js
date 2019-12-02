const express = require('express');
const Request = require("../models/Request");
const authenticate = require("./utils/auth")

const router = express.Router();

// Create a request route
router.post('/', authenticate, (req, res, next) => {
  const request = new Request({
    userId: req.user,
    requestedUserId: req.body.requestedUserId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    accepted: req.body.accepted,
    paid: req.body.paid
  });

  request.save((err, request) => {
    if (err) {
      console.log(err);
      res.json({
        message: "something went wrong"
      });
    } else {
      res.status(200).json(request);
    }
  });
});


// Get all requests you sent 
router.get('/all', authenticate, (req, res, next) => {
  Request.find({ userId: req.user }, (err, requests) => {
    if (err) return next(err);
    res.json(requests);
  });
});


// Get all requests other sent you
// router.get('/fromOthers'. authenticate, (req, res, next) => {
//   Request.find({ requestedUserId: req.user }, (err, requests) => {
//     if (err) return next(err);
//     res.json(requests);
//   });
// });


// Delete a request 
router.delete('/delete/:id', authenticate, (req, res) => {
  Request.remove({_id: req.params.id}, (err, request) => {
    if (err) return next(err);
    res.json({ message: "successfully deleted"});
  });
});

module.exports = router;   