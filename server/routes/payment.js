const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_IllR1H3Om8oeJnGT7UjtTCIS00fS8kHN59");

const charge = (token, amount) => {
    return stripe.charges.create({
        amount: amount,
        currency: 'cad',
        source: token,
        description: "dog sitting",
    });
};

router.post("/", async(req, res, next) => {
    try {
        let data = await charge(req.body.token, req.body.amount);
        console.log(data);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;