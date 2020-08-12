import React, { Component } from "react";
import StripeCheckout from 'react-stripe-checkout';

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import SideNavigationBar from "../components/SideNavBar";
import Navbar from "../components/Navbar";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "15",
      name: localStorage.getItem("name"),
      description: "Dog sitting fee"
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onToken = (amount, description) => token => {
    console.log(token);
    alert("Successfully Charged");
  }
  
  render() {
    return (
      <div>
        <Navbar/>
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