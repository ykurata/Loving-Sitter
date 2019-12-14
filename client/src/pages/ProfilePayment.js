import React, { Component } from "react";

import SideNavigationBar from "./SideNavBar";
import NavigationBar from "./Navbar";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { Snackbar, IconButton } from "@material-ui/core";

import axios from "axios";

const paymentDetails = {
  name: "Pay Sitter",
  amount: "15",
  decimal: "00",
  quantity: 1,
  currency: "cad",
  payment_method_type: "card",
  disabled: false,
  snackbarmsg: "",
  snackbaropen: false,
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

  checkValidPay() {
    var check = true;
    if (this.state.decimal.length < 2 || this.state.decimal.length > 2) {
      this.setState({ decimal: "00" });
      console.log("Cents field must have 2 digits");
      this.setState({ snackbarmsg: "Cents field must have 2 digits", snackbaropen: true });
      check = false;
    }
    if (this.state.amount.length < 1) {
      console.log("Please enter an amount in the dollars box")
      this.setState({ snackbarmsg: "Please enter an amount in the dollars box", snackbaropen: true });
      check = false;
    }
    return check;
  }

  snackbarClose = event => {
    this.setState({ snackbaropen: false });
  };

  handleSubmit = event => {
    event.preventDefault();

    const valid = this.checkValidPay();

    // Integrate payment to individual people
    if (valid) {
      axios.post("/profile-payment", this.state)
        .then(res => {
          const keyPublishable = "pk_test_AgD4J9rRiEMq0w6u2yhMbhIS0000UbX6jH";
          const stripe = window.Stripe(keyPublishable);
          const { error } = stripe.redirectToCheckout({
            sessionId: res.data.sessionId
          })
          console.log(res.data);
          console.log(error);
        })
        .catch(err => {
          console.log(err);
          this.setState({
            errors: err // Error messages from server
          });
        });
    } else {

    }
  }

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            ></IconButton>
          ]}
        />
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
                      disabled={this.state.disabled ? true : false}
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
                      disabled={this.state.disabled ? true : false}
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
