const express = require('express');
const router = express.Router();
const Request = require("../models/Request");
const authenticate = require("./utils/auth");
const ObjectId = require("mongodb").ObjectID;

// Create a request 
router.post('/', authenticate, (req, res, next) => {
  const request = new Request({
    senderId: req.user,
    recieverId: req.body.recieverId,
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

// Update a request
router.put('/update/:id', authenticate, (req, res, next) => {
  Request.findOne({ _id: req.params.id }, (err, request) => {
    if (err) return next(err);
    request.senderId = req.body.senderId,
    request.recieverId = req.body.recieverId,
    request.startDate = req.body.startDate,
    request.endDate = req.body.endDate,
    request.accepted = req.body.accepted,
    request.paid = req.body.paid

    request.save(function(err, request) {
      if (err) return next(err);
      res.status(200).json(request);
    });
  })
})

// Get all requests you sent 
router.get('/get-requests', authenticate, (req, res, next) => {
  Request.aggregate([
    {
      $match: { senderId: ObjectId(req.user) }
    },
    {
      $lookup: {
        from: "profiles",
        localField: "recieverId",
        foreignField: "userId",
        as: "reciever_info"
      }
    }
  ], (err, requests) => {
    if (err) return next(err);
    res.status(200).json(requests);
  });
});

// Get all requests other sent you
router.get('/get-requested', authenticate, (req, res, next) => {
  Request.aggregate([
    {
      $match: { recieverId: ObjectId(req.user) }
    },
    {
      $lookup: {
        from: "profiles",
        localField: "senderId",
        foreignField: "userId",
        as: "sender_info"
      }
    }
  ], (err, requested) => {
    if (err) return next(err);
    res.status(200).json(requested);
  });
});

// Delete a request 
router.delete('/delete/:id', authenticate, (req, res, next) => {
  Request.remove({_id: req.params.id}, (err, request) => {
    if (err) return next(err);
    res.json({ message: "successfully deleted"});
  });
});

module.exports = router;   