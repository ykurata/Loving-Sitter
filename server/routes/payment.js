const keyPublishable = "pk_test_AgD4J9rRiEMq0w6u2yhMbhIS0000UbX6jH";
//Make keySecret secret before deploying
const keySecret = "sk_test_k5r0VkkM3ddLjMmst8aYC23900eTkN1l2U";

var express = require("express");
var router = express.Router();
const authenticate = require("./utils/auth");
const stripe = require("stripe")(keySecret);
//const callStripe = Stripe(keyPublishable);

const payment = require("../services/payment");

//router.post("/payment", payment.createPayment);

router.post("/", async function (req, res) {
    //const domainURL = process.env.DOMAIN;
    const domainURL = "http://localhost:3001"

    const quantity = 1;//req.body;
    // Create new Checkout Session for the order
    // Other optional params include:
    // [billing_address_collection] - to display billing address details on the page
    // [customer] - if you have an existing Stripe Customer ID
    // [payment_intent_data] - lets capture the payment later
    // [customer_email] - lets you prefill the email input in the form
    // For full details see https://stripe.com/docs/api/checkout/sessions/create
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                name: "Pasha photo",
                images: ["https://picsum.photos/300/300?random=4"],
                quantity: quantity,
                currency: "cad",
                amount: 2000//process.env.BASE_PRICE // Keep the amount on the server to prevent customers from manipulating on client
            }
        ],
        // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
        //success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        //cancel_url: `${domainURL}/canceled.html`
        success_url: `${domainURL}/profile`,
        cancel_url: `${domainURL}/profile`
    });

    /*const {error} = await stripe.redirectToCheckout({
        sessionId: session.id
    })*/

    res.send({
        sessionId: session.id,
        error: error
    });
}),

    module.exports = router;