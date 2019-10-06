import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import "../App.scss";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/styles";

const initalState = {
  name: "",
  nameError: "",
  email: "",
  emailError: "",
  password: "",
  confirmPassword: "",
  passwordError: "",
  errors: ""
};

class SignUpPage extends Component {
  state = initalState;

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handleNameChange = event => {
    if (event.target.value.match("^[a-zA-Z]*$") != null) {
      this.setState({ name: event.target.value });
    }
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleConfirmPasswordChange = event => {
    this.setState({ confirmPassword: event.target.value });
  };

  validate = () => {
    let emailError = "";
    let passwordError = "";
    var re = /[^@]+@[^.]+\..+/;
    var test = re.test(this.state.email);
    if (!test === true) {
      emailError = "Invalid email";
    }

    if (emailError) {
      this.setState({ emailError });
      return false;
    }

    if (this.state.password.length < 6) {
      passwordError = "Password is too short";
    }

    if (passwordError) {
      this.setState({ passwordError });
      return false;
    }

    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    this.validate();
    

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
        localStorage.setItem('jwtToken', res.data);
        localStorage.setItem('name', decoded.name);
        this.props.history.push('/');
    })
    .catch(err => {
        this.setState({
          errors: err.response.data.error  // Error messages from backend
        });
    });
  };

  render() {
    return (
      <div>
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
                    {
                      (this.state.errors)
                      ? <Grid item xs={12} className="pb-0 pt-0" style={{ color: "red" }}>
                          <p className="mb-0 mt-0">{this.state.errors}</p>
                        </Grid>
                      : <Grid></Grid>
                    }

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
                        onChange={this.handleNameChange}
                        fullWidth
                      />
                      <div style={{ color: "red" }}>{this.state.nameError}</div>
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
                        onChange={this.handleEmailChange}
                        fullWidth
                      />
                      <div style={{ color: "red" }}>
                        {this.state.emailError}
                      </div>
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
                        onChange={this.handlePasswordChange}
                        fullWidth
                      />
                      <div style={{ color: "red" }}>
                        {this.state.passwordError}
                      </div>
                    </Grid>

                    <Grid item xs={12} className="pb-0 pt-0">
                      <p className="mb-0 mt-0">CONFIRM PASSWORD</p>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="confirmPassword"
                        id="outlined-password"
                        placeholder="Confrim Password"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        value={this.state.confirmPassword}
                        onChange={this.handleConfirmPasswordChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} className="center">
                      <Button
                        variant="contained"
                        onClick={this.handleSubmit}
                        fullWidth
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
