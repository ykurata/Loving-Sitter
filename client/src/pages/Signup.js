import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const SignUpStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    margin: theme.spacing(1, 1, 1, 0),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      pasword: "",
      confirmPassword: "",
      validationErrors: [],
    }
  }

  // Update user input
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;

    const newUser = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }

    axios.post('/users/register', newUser)
    .then(res => {
        const { token } = res.data;
        const decoded = jwt_decode(token);
        localStorage.setItem('jwtToken', token);
        localStorage.setItem("userId", decoded.id);
        this.props.history.push('/');
    })
    .catch(err => {
        this.setState({
          validationErrors: err.response.data  // Error messages from backend
        });
        console.log(err.response)
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Sign Up 
        </Typography>
        {this.state.error ? 
          <div style={{ color: "red", marginTop: "10px" }}>
            {this.state.error}
          </div>
        : null}
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <Typography className={classes.label}>Name</Typography>
          {this.state.validationErrors ? 
            <div style={{ color: "red" }}>
              {this.state.validationErrors.name}
            </div>
          : null}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            name="name"
            placeholder="Name"
            onChange={this.onChange}
          />
          <Typography className={classes.label}>Email Address</Typography>
          {this.state.validationErrors ? 
            <div style={{ color: "red" }}>
              {this.state.validationErrors.email}
            </div>
          : null}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            name="email"
            placeholder="Email Address"
            onChange={this.onChange}
          />
          <Typography className={classes.label}>Password</Typography>
          {this.state.validationErrors ? 
            <div style={{ color: "red" }}>
              {this.state.validationErrors.password}
            </div>
          : null}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            type="password"
            id="password"
            placeholder="Password"
            onChange={this.onChange}
          />
          <Typography className={classes.label}>Confirm Password</Typography>
          {this.state.validationErrors ? 
            <div style={{ color: "red" }}>
              {this.state.validationErrors.password2}
            </div>
          : null}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="confrimPassword"
            type="password"
            id="confrimPassword"
            placeholder="Confirm Password"
            onChange={this.onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container alignItems="center" justify="center" >
            <Grid item style={{ marginBottom: "50px" }}>
              <Link href="/login" variant="body2">
                Already a member? Log In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </Container>
    );
  }
}

export default withStyles(SignUpStyles)(SignUp);