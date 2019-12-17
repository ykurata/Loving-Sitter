import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from '../constants/stripe';
import PAYMENT_SERVER_URL from '../constants/server';

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Snackbar, IconButton } from "@material-ui/core";

import SideNavigationBar from "./SideNavBar";
import NavigationBar from "./Navbar";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "15",
      decimal: "00",
      quantity: 1,
      currency: "cad",
      payment_method_type: "card",
      disabled: false,
      snackbarmsg: "",
      snackbaropen: false,
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  fromDollarToCent = amount => parseInt(this.state.amount * 100);

  successPayment = data => {
    alert('Payment Successful');
  };
  
  errorPayment = data => {
    alert('Something went wrong');
  };

  onToken = (amount) => token =>
    axios.post(PAYMENT_SERVER_URL,
      {
        source: token.id,
        currency: this.state.currency,
        amount: this.fromDollarToCent(this.state.amount)
      })
      .then(this.successPayment)
      .catch(this.errorPayment);

  snackbarClose = event => {
    this.setState({ snackbaropen: false });
  };

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
                      onChange={this.onChange}
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
                      onChange={this.onChange}
                      margin="normal"
                      variant="outlined"
                      required
                      disabled={this.state.disabled ? true : false}
                    />
                  </Grid>
                  <Grid item>
                    <StripeCheckout
                      amount={this.fromDollarToCent(this.state.amount)}
                      token={this.onToken(this.state.amount)}
                      currency={this.state.currency}
                      stripeKey={STRIPE_PUBLISHABLE}
                      email
                      allowRememberMe
                    />
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

export default Payment;
