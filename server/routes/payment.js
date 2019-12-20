const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_IllR1H3Om8oeJnGT7UjtTCIS00fS8kHN59");

router.post("/", (req, res) => {
    try {
        stripe.charges.create({
            amount: req.body.amount * 100,
            currency: 'cad',
            source: 'tok_visa',
            description: "dog sitting fee"
        })
        console.log("charged");
    } catch(err) {
        res.status(500).json({
            message: err.message
        });
    }
});


module.exports = router;