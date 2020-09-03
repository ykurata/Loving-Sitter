import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";

const PaymentStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
  },
  formContainer: {
    marginTop: 80,
  },
  title: {
    paddingBottom: 20,
  },
}));

const Payment = (props) => {
  const classes = PaymentStyles();
  const [userInput, setUserInput] = useState({
    amount: "",
    name: localStorage.getItem("name"),
    description: "Dog sitting fee",
  });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onToken = (amount, description) => (token) => {
    alert("Successfully Charged");
  };

  return (
    <div>
      <Navbar />
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <form>
            <Grid container align="center">
              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6">
                  Amount to pay
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="amount"
                  id="standard-amount"
                  placeholder="Enter your amount here"
                  helperText="Dollars"
                  type="number"
                  value={userInput.amount}
                  onChange={onChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <StripeCheckout
                  name={userInput.name}
                  amount={userInput.amount * 100}
                  currency="CAD"
                  description={userInput.description}
                  stripeKey="pk_test_jB07RDdD2SJjuc0khprUiBce00z88npnC5"
                  token={onToken(userInput.amount, userInput.description)}
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Payment;
