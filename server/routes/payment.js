const keyPublishable = "pk_test_AgD4J9rRiEMq0w6u2yhMbhIS0000UbX6jH";
//Make keySecret secret before deploying
const keySecret = "sk_test_k5r0VkkM3ddLjMmst8aYC23900eTkN1l2U";

var express = require("express");
var router = express.Router();
const authenticate = require("./utils/auth");
const stripe = require("stripe")(keySecret);

const payment = require("../services/payment");
//Add Authorization later
router.post("/", async function (req, res) {
    //const domainURL = process.env.DOMAIN;
    const domainURL = "http://localhost:3000"

    // Create new Checkout Session for the order
    // Other optional params include:
    // [billing_address_collection] - to display billing address details on the page
    // [customer] - if you have an existing Stripe Customer ID
    // [payment_intent_data] - lets capture the payment later
    // [customer_email] - lets you prefill the email input in the form
    // For full details see https://stripe.com/docs/api/checkout/sessions/create
    const session = await stripe.checkout.sessions.create({
        payment_method_types: [req.body.payment_method_type],
        line_items: [
            {
                name: req.body.name,
                //images: ["https://picsum.photos/300/300?random=4"],
                quantity: req.body.quantity,
                currency: req.body.currency,
                amount: req.body.amount//process.env.BASE_PRICE // Keep the amount on the server to prevent customers from manipulating on client
            }
        ],
        // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
        //success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        //cancel_url: `${domainURL}/canceled.html`
        success_url: `${domainURL}/profile`,
        cancel_url: `${domainURL}/profile`
    });

    res.send({
        sessionId: session.id,
    });
}),

    module.exports = router;