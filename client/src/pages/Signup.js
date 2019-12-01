import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Snackbar, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "../App.scss";

export const snackbarmsg = "";

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      pasword: "",
      confirmPassword: "",
      validationErrors: [],
      snackbaropen: false,
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

  snackbarClose = e => {
    this.setState({ snackbaropen: false });
  };

  enableEdit = e => {
    this.setState({ disabled: false });
  };

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
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
        <Grid container spacing={3}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <div className="container">
              <div className="infoBox ">
                <form onSubmit={this.handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <h1 className="center">Sign Up</h1>
                    </Grid>

                    {/* {
                      (this.state.errors)
                      ? <Grid item xs={12} className="pb-0 pt-0" style={{ color: "red" }}>
                          <p className="mb-0 mt-0">{this.state.errors}</p>
                        </Grid>
                      : null
                    } */}

                    <Grid item xs={12} className="pb-0 pt-0">
                      <p className="mb-0 mt-0">NAME</p>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="name"
                        id="outlined-name"
                        placeholder="Name"
                        margin="normal"
                        variant="outlined"
                        type="text"
                        value={this.state.name}
                        onChange={this.onChange}
                        fullWidth
                      />
                      {this.state.validationErrors ? 
                        <div style={{ color: "red" }}>
                          {this.state.validationErrors.name}
                        </div>
                      : null}
                    </Grid>

                    <Grid item xs={12} className="pb-0 pt-0">
                      <p className="mb-0 mt-0">EMAIL ADDRESS</p>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="email"
                        id="outlined-email"
                        placeholder="Email"
                        margin="normal"
                        variant="outlined"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        fullWidth
                      />
                      {this.state.validationErrors ? 
                        <div style={{ color: "red" }}>
                          {this.state.validationErrors.email}
                        </div>
                      : null}
                    </Grid>

                    <Grid item xs={12} className="pb-0 pt-0">
                      <p className="mb-0 mt-0">PASSWORD</p>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="password"
                        id="outlined-password"
                        placeholder="Password"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        fullWidth
                      />
                      {this.state.validationErrors ? 
                        <div style={{ color: "red" }}>
                          {this.state.validationErrors.password}
                        </div>
                      : null}
                    </Grid>

                    <Grid item xs={12} className="pb-0 pt-0">
                      <p className="mb-0 mt-0">CONFIRM PASSWORD</p>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="confirmPassword"
                        id="outlined-confirmPassword"
                        placeholder="Confrim Password"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        value={this.state.confirmPassword}
                        onChange={this.onChange}
                        fullWidth
                      />
                      {this.state.validationErrors ? 
                        <div style={{ color: "red" }}>
                          {this.state.validationErrors.password2}
                        </div>
                      : null}
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} className="center">
                      <Button
                        variant="contained"
                        onClick={this.handleSubmit}
                        fullWidth
                        className="submit-button"
                        size="large"
                      >
                        Sign Up
                      </Button>
                    </Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={12} className="center">
                      <p>
                        Already have an Account? <a href="../login">Login</a>
                      </p>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </div>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </div>
    );
  }
}

export default SignUpPage;
