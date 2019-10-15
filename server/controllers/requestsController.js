import Request from "../models/Request";

module.exports.createRequest = async function(req, res, next) {
  const request = {
    userId: req.user,
    requestedUserId: req.body.requestedUserId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    status: req.body.status,
    paid: req.body.paid
  };
  // validation
  const errDict = {
    userId: "User ID",
    requestedUserId: "Requested user ID",
    startDate: "Start date",
    endDate: "End date",
    status: "Status",
    paid: "Paid status"
  };

  const keys = Object.keys(request);

  for (const key of keys) {
    if (!request[key]) {
      res.status(400).json({ error: `${errDict[key]} is required` });
      next();
    }
  }
  // creating new request
  const newRequest = new Request(request);
  await newRequest.save();
  res.status(200).json({ message: `Request was successfully sent!` });
};

module.exports.updateRequest = async function(req, res, next) {
  let request = await Request.findOne({
    userId: req.user,
    requestedUserId: req.body.requestedUserId
  });

  if (!request) {
    res.status(404).json({ error: "Request was not found" });
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
