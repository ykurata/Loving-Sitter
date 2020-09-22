const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_IllR1H3Om8oeJnGT7UjtTCIS00fS8kHN59");

router.post("/", (req, res) => {
  stripe.customers
    .create({
      email: req.body.token.email,
      source: req.body.token.id,
    })
    .then((customer) => {
      stripe.charges.create({
        amount: req.body.amount * 100,
        currency: "cad",
        customer: customer.id,
        receipt_email: req.body.token.email,
        description: "dog sitting fee",
      });
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
