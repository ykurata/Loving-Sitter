import React, { Component } from "react";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";

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
      name: localStorage.getItem("name"),
      description: "dog sitting fee"
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onToken = (amount, description) => token => {
    axios.post("/payment", {
      description,
      token: token.id,
      currency: "CAD",
      amount: this.state.amount * 100
    })
    .then(res => {
      alert("Payment Successful");
    })
    .catch(err => {
      alert("Payment Error");
    })
  }
  // async handleToken(token) {
  //   const response = await axios.post("/payment", {
  //     token,
  //     amount: this.state.amount * 100,
  //     description: this.state.description,
  //     name: this.state.name
  //   })
  //   const { status } = response.data;
  //   if (status === "success") {
  //     alert("Payment success");
  //   } else {
  //     alert("Payment Error");
  //   }
  // }

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
                  </Grid>
                  <Grid item>
                    <StripeCheckout
                      name={this.state.name}
                      amount={this.state.amount * 100}
                      currency="CAD"
                      description={this.state.description}
                      stripeKey="pk_test_jB07RDdD2SJjuc0khprUiBce00z88npnC5"
                      token={this.onToken(this.state.amount, this.state.description)}
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