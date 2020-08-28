import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../actions/authActions";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const loginStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(18),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    margin: theme.spacing(1, 1, 1, 0),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
  },
}));

const Login = (props) => {
  const classes = loginStyles();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);

  // Update user input
  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/sitter-search");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(userInput));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Log In
        </Typography>
        {error.error ? (
          <div className={classes.error}>{error.error}</div>
        ) : null}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography className={classes.label}>Email Address</Typography>
          {error ? <div className={classes.error}>{error.email}</div> : null}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            name="email"
            placeholder="Email Address"
            onChange={onChange}
          />
          <Typography className={classes.label}>Password</Typography>
          {error ? <div className={classes.error}>{error.password}</div> : null}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            type="password"
            id="password"
            placeholder="Password"
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container alignItems="center" justify="center">
            <Grid item>
              <Typography
                variant="body2"
                component={Link}
                to={"/signup"}
                style={{ textDecoration: "none" }}
              >
                Don't have an account? Sign Up
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
