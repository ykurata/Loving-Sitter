import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "../App.scss";


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      validationErrors: []
    }
  }
  
  // Update user input
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const data = {
      email: email,
      password: password
    };
    axios.post("/users/login", data)
      .then(res => {
        const { token } = res.data;
        const decoded = jwt_decode(token);
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userId", decoded.id);
        console.log("successfully logged in ");
        this.props.history.push("/profile");
      })
      .catch(err => {
        this.setState({
          validationErrors: err.response.data, // Error messages from backend
          error: err.response.data.error
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
                      <h1 className="center">LogIn</h1>
                    </Grid>
                    {this.state.error ? (
                      <Grid item xs={12} className="pb-0 pt-0" style={{ color: "red" }}>
                        <p>{this.state.error}</p>
                      </Grid>
                    ) : null}
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
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} className="center">
                      <Button
                        variant="contained"
                        onClick={this.handleSubmit}
                        fullWidth
                        className="submit-button"
                        size="large"
                      >
                        Login
                      </Button>
                    </Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={12} className="center">
                      <p>
                        Don't have an Account? <a href="../signup">Register</a>
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
export default withRouter(LoginPage);
