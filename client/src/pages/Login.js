import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../actions/authActions";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import login from "../images/login.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${login})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(8, 4),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
  },
  buttonContainer: {
    textAlign: "center",
  },
  error: {
    color: "red",
  },
}));

const Login = (props) => {
  const classes = useStyles();
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

  const demoLogin = (e) => {
    e.preventDefault();
    const demoUser = {
      email: "demouser@email.com",
      password: "password",
    };
    dispatch(loginUser(demoUser));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            {error.error ? (
              <div className={classes.error}>{error.error}</div>
            ) : null}
            {error ? <div className={classes.error}>{error.email}</div> : null}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={onChange}
            />
            {error ? (
              <div className={classes.error}>{error.password}</div>
            ) : null}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={onChange}
            />
            <div className={classes.buttonContainer}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Button
                onClick={demoLogin}
                size="large"
                variant="outlined"
                color="secondary"
                className={classes.submit}
              >
                Demo User
              </Button>
            </div>
            <div className={classes.buttonContainer}>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
