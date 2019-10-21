import React, { Component } from "react";

import SideNavigationBar from "./SideNavBar";
import NavigationBar from "./Navbar";

import Button from "@material-ui/core/Button";

import axios from "axios";

const paymentDetails = {
  pDetails: {
    amount: 1,
    quantity: 1,
    currency: "cad",
    payment_method_type: "card",
  }
};

/*var handleResult = function(result){
  const keyPublishable = "pk_test_AgD4J9rRiEMq0w6u2yhMbhIS0000UbX6jH";
        const stripe = Stripe(keyPublishable);
        const {error} = stripe.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: result
        })
}*/

class ProfilePayment extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();

    //Add Authorization later
    axios.post("/profile-payment")
      .then(res => {
        const keyPublishable = "pk_test_AgD4J9rRiEMq0w6u2yhMbhIS0000UbX6jH";
        const stripe = window.Stripe(keyPublishable);
        const {error} = stripe.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: res.data.sessionId
        })
        console.log(res.data);
      })
      .catch(err => {
        this.setState({
          errors: err.response.data // Error messages from server
        });
      });
  }

  render() {
    return (
      <div>
        <NavigationBar></NavigationBar>
        <div className="pageArea">
          <div className="infoArea">
            <div className="menuArea">
              <SideNavigationBar></SideNavigationBar>
            </div>
            <div className="settingsArea">
              <form noValidate autoComplete="off" method="POST" onSubmit={this.handleSubmit}>
                <Button className="submit-button" onClick={this.handleSubmit}>Pay via card</Button>
                <button type="submit" className="submit-button">Test here</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePayment;
