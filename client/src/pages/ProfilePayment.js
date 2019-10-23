import React, { Component } from "react";

import SideNavigationBar from "./SideNavBar";
import NavigationBar from "./Navbar";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import axios from "axios";

const paymentDetails = {
  name: "Pay Sitter",
  amount: "15",
  decimal: "00",
  quantity: 1,
  currency: "cad",
  payment_method_type: "card",
};

class ProfilePayment extends Component {

  state = paymentDetails;

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAmountChange = event => {
    let amount = { ...this.state.amount };
    amount = event.target.value;
    this.setState({ amount });
  };

  handleDecimalChange = event => {
    let decimal = { ...this.state.decimal };
    decimal = event.target.value;
    this.setState({ decimal });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios.post("/profile-payment", this.state)
      .then(res => {
        const keyPublishable = "pk_test_AgD4J9rRiEMq0w6u2yhMbhIS0000UbX6jH";
        const stripe = window.Stripe(keyPublishable);
        const { error } = stripe.redirectToCheckout({
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
                <Grid container align="center" direction="column" spacing={2}>
                  <Grid item>
                    <p>Amount to pay</p>
                  </Grid>
                  <Grid item>
                    <TextField
                      name="amount"
                      id="standard-amount"
                      placeholder="Please enter your amount here"
                      helperText="Dollars"
                      type="number"
                      value={this.state.amount}
                      onChange={this.handleAmountChange}
                      margin="normal"
                      variant="outlined"
                      required
                      disabled={this.state.disabled ? "disabled" : ""}
                    />
                    <TextField
                      name="decimal-amount"
                      id="standard-amount"
                      placeholder="00"
                      helperText="Cents"
                      type="number"
                      min="0"
                      max="99"
                      value={this.state.decimal}
                      onChange={this.handleDecimalChange}
                      margin="normal"
                      variant="outlined"
                      required
                      disabled={this.state.disabled ? "disabled" : ""}
                    />
                  </Grid>
                  <Grid item>
                    <Button className="submit-button mb-1" onClick={this.handleSubmit}>Pay via card</Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePayment;
