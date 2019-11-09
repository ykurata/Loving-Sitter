import Request from "../models/Request";
import Profile from "../models/Profile";
const ObjectId = require("mongodb").ObjectID;

module.exports.createRequest = async function (req, res, next) {
  const request = {
    userId: req.user,
    requestedUserId: req.body.requestedUserId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    accepted: req.body.accepted,
    paid: req.body.paid
  };

  //check if this request alredy exists
  const requestExists = await Request.find(request);
  if (requestExists.length) {
    return res.status(409).json({ error: "Duplicate request" });
  }

  // validation
  const errDict = {
    userId: "User ID",
    requestedUserId: "Requested user ID",
    startDate: "Start date",
    endDate: "End date",
    accepted: "Acceptance status",
    paid: "Paid status"
  };

  const keys = Object.keys(request);

  for (const key of keys) {
    if (request[key] === "" || request[key] === null) {
      return res.status(400).json({ error: `${errDict[key]} is required` });
    }
  }
  // creating new request
  const newRequest = new Request(request);
  await newRequest.save();
  res.status(200).json({ message: `Request was successfully sent!` });
};

module.exports.updateRequest = async function (req, res, next) {
  let request = await Request.findOne({
    userId: req.user,
    requestedUserId: req.body.requestedUserId
  });

  if (!request) {
    return res.status(404).json({ error: "Request was not found" });
  }
  const keys = Object.keys(req.body);
  for (const key of keys) {
    if (key in request) {
      request[key] = req.body[key];
    }
  }

  await request.save();
  res.status(200).json({ message: `Request was successfully updated!` });
};

// get the requests that others sent to you
module.exports.getRequests = async function (req, res, next) {
  let requests = await Request.find({ requestedUserId: req.user });
  if (!requests) {
    res.status(404).json({ error: "No requests were found" });
  } else {
    res.status(200).json({ requests: requests });
  }
};

// get the requests that others sent to you with profiles
module.exports.getRequestsWithProfiles = async function (req, res, next) {
  Request.aggregate([
    {
      $match: { userId: ObjectId(req.user) }
    },
    {
      $lookup: {
        from: "profiles",
        localField: "requestedUserId",
        foreignField: "userId",
        as: "profile_info"
      }
    },
    {
      $unwind: "$profile_info"
    },
  ], function (err, requests) {
    if (err) return next(err);
    res.status(200).json({ requests: requests });
  })
};

// get the requests that you sent to others
module.exports.getRequested = async function (req, res, next) {
  let requests = await Request.find({ userId: req.user });
  if (!requests) {
    res.status(404).json({ error: "No requests were found" });
  } else {
    res.status(200).json({ requests: requests });
  }
};

// get the requests that you sent to others with profiles
module.exports.getRequestedWithProfile = async function (req, res, next) {
  /*let requests = await Request.find({ userId: req.user });
  let profile = await Profile.find({ requestedUserId: req.user});*/

  //Right now, it is currently working as if it's getRequestsWithProfile
  console.log(req.user)
  Request.aggregate([
    {
      $match: { userId: ObjectId(req.user) }
    },
    /*{
      $unwind: "$userId"
    },*/
    {
      $lookup: {
        from: "profiles",
        localField: "requestedUserId",
        foreignField: "userId",
        as: "profile_info"
      }
    },
    {
      $unwind: "$profile_info"
    },
    /*{
      $group: {
        _id: "$_id",
        userId: { $push: "$userId"},
        profile_info: {$push: "$profile_info"}
      }
    }*/
  ], function (err, requests) {
    if (err) return next(err);
    res.status(200).json({ requests: requests });
  })

  /*let a = await Request.aggregate([{
    $lookup: {
      from: "Profile",
      localField: "userId",
      foreignField: "requestedUserId",
      as: "profile"
    }
  }])

  if (!a) {
    res.status(404).json({ error: "An error has occurred" });
  } else {
    res.status(200).json({ requests: a });
  }*/

  /*if (!requests) {
    res.status(404).json({ error: "No requests were found" });
  } else {
    //res.status(200).json({ requests: requests });
  }*/
};
