import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";
import SideNavigationBar from "../components/SideNavBar";
import dogImage from "../images/dog-image.jpg";

const PaymentStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    [theme.breakpoints.down("xs")]: {
      marginTop: 50,
    },
  },
  title: {
    paddingBottom: 20,
  },
  card: {
    width: "60%",
    margin: "auto",
    padding: 0,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  cardHead: {
    height: 150,
  },
  sideNav: {
    width: "70%",
    paddingLeft: 100,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      paddingLeft: 15,
    },
    [theme.breakpoints.down("xs")]: {
      width: "40%",
    },
  },
  marginTop: {
    marginTop: 10,
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

  const makePayment = (token) => {
    const body = {
      token,
      amount: userInput.amount,
    };
    axios
      .post("/payment", body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={2} md={2}>
          <div className={classes.sideNav}>
            <SideNavigationBar />
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={10}>
          <Card className={classes.card}>
            <form>
              <CardMedia
                className={classes.cardHead}
                image={dogImage}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography className={classes.title} variant="h6">
                  Amount to pay
                </Typography>
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
              </CardContent>
              <CardContent>
                <StripeCheckout
                  stripeKey="pk_test_jB07RDdD2SJjuc0khprUiBce00z88npnC5"
                  token={makePayment}
                  name={userInput.name}
                  amount={userInput.amount * 100}
                >
                  <Button variant="contained" color="primary">
                    Pay Now $ {userInput.amount}
                  </Button>
                </StripeCheckout>
                <Typography
                  className={classes.marginTop}
                  variant="body2"
                  color="textSecondary"
                >
                  Default card number is 4242 4242 4242 4242
                </Typography>
              </CardContent>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Payment;
