import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import NavigationBar from "./Navbar";
import axios from "axios";

import SideNavigationBar from "./SideNavBar";

import Button from "@material-ui/core/Button";

import { Snackbar, IconButton } from "@material-ui/core";

const initalState = {
  user: {
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    phone: "",
    address: "",
    description: "",
    rate: "",
    errors: {}
  },
  disabled: false,
  snackbaropen: true,
  snackbarmsg: "test",
  edit: "0",
  formChanges: false
};

class EditProfilePage extends Component {
  state = initalState;

  handleFirstNameChange = event => {
    let user = { ...this.state.user };
    user.firstName = event.target.value;
    this.setState({ user });
  };

  handleLastNameChange = event => {
    let user = { ...this.state.user };
    user.lastName = event.target.value;
    this.setState({ user });
  };

  handleGenderChange = event => {
    let user = { ...this.state.user };
    user.gender = event.target.value;
    this.setState({ user });
  };

  handleEmailChange = event => {
    let user = { ...this.state.user };
    user.email = event.target.value;
    this.setState({ user });
  };

  handleDobChange = event => {
    let user = { ...this.state.user };
    user.birthDate = event.target.value;
    this.setState({ user });
  };

  handlePhoneChange = event => {
    let user = { ...this.state.user };
    user.phone = event.target.value;
    this.setState({ user });
  };

  handleAddressChange = event => {
    let user = { ...this.state.user };
    user.address = event.target.value;
    this.setState({ user });
  };

  handleDescriptionChange = event => {
    let user = { ...this.state.user };
    user.description = event.target.value;
    this.setState({ user });
  };

  handleRateChange = event => {
    let user = { ...this.state.user };
    user.rate = event.target.value;
    this.setState({ user });
  };

  handleSubmit = event => {
    event.preventDefault();

    // Get token from local storage
    const token = localStorage.getItem("jwtToken");

    const { user } = this.state;

    axios
      .post("/profile/create", user, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        this.props.history.push("/");
        console.log(res.data);
      })
      .catch(err => {
        this.setState({
          errors: err.response.data // Error messages from server
        });
      });
    this.setState({ disabled: true });
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  snackbarClose = event => {
    this.setState({ snackbaropen: false });
  };

  enableEdit = event => {
    this.setState({ disabled: false, edit: "1" });
  };

  cancelEdit = event => {
    this.setState({ disabled: true, edit: "0" });
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
        <NavigationBar></NavigationBar>
        <div className="pageArea">
          <div className="infoArea">
            <div className="menuArea">
              <SideNavigationBar></SideNavigationBar>
            </div>
            <div className="settingsArea">
              <Grid container spacing={3}>
                <Grid item xs={12} className="center">
                  <h1>Edit Profile</h1>
                </Grid>
                <Grid item xs={12}>
                  <form
                    noValidate
                    autoComplete="off"
                    method="POST"
                    onSubmit={this.handleSubmit}
                  >
                    <Grid container spacing={3} className="pb-1">
                      <Grid item xs={1}></Grid>
                      <Grid item xs={9}>
                        <Grid container spacing={3}>
                          <Grid item xs={3} className="text-right">
                            <p>FIRST NAME</p>
                            {this.state.errors ? (
                              <div style={{ color: "red" }}>
                                {this.state.errors.firstName}
                              </div>
                            ) : null}
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              name="firstName"
                              id="standard-firstName"
                              placeholder="John"
                              value={this.state.firstName}
                              onChange={this.handleFirstNameChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled ? "disabled" : ""}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}></Grid>

                      {/* Last name */}

                      <Grid item xs={1}></Grid>
                      <Grid item xs={9}>
                        <Grid container spacing={3}>
                          <Grid item xs={3} className="text-right">
                            <p>LAST NAME</p>
                            {this.state.errors ? (
                              <div style={{ color: "red" }}>
                                {this.state.errors.lastName}
                              </div>
                            ) : null}
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              name="lastName"
                              id="standard-lastName"
                              placeholder="Doe"
                              value={this.state.lastName}
                              onChange={this.handleLastNameChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled ? "disabled" : ""}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}></Grid>

                      {/* Gender */}

                      <Grid item xs={1}></Grid>
                      <Grid item xs={9}>
                        <Grid container spacing={3}>
                          <Grid item xs={3} className="text-right">
                            <p>GENDER</p>
                            {this.state.errors ? (
                              <div style={{ color: "red" }}>
                                {this.state.errors.gender}
                              </div>
                            ) : null}
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              select
                              name="gender"
                              id="standard-gender"
                              label="gender"
                              value={this.state.user.gender}
                              onChange={this.handleGenderChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled ? "disabled" : ""}
                              fullWidth
                            >
                              <MenuItem value="">
                                <em>Gender</em>
                              </MenuItem>
                              <MenuItem value={"male"}>Male</MenuItem>
                              <MenuItem value={"female"}>Female</MenuItem>
                            </TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}></Grid>

                      {/* DOB */}

                      <Grid item xs={1}></Grid>
                      <Grid item xs={9}>
                        <Grid container spacing={3}>
                          <Grid item xs={3} className="text-right">
                            <p>BIRTH DATE</p>
                            {this.state.errors ? (
                              <div style={{ color: "red" }}>
                                {this.state.errors.birthDate}
                              </div>
                            ) : null}
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              type="date"
                              name="birthDate"
                              id="standard-birthDate"
                              value={this.state.birthDate}
                              onChange={this.handleDobChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled ? "disabled" : ""}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}></Grid>

                      {/* Email */}

                      <Grid item xs={1}></Grid>
                      <Grid item xs={9}>
                        <Grid container spacing={3}>
                          <Grid item xs={3} className="text-right">
                            <p>EMAIL ADDRESS</p>
                            {this.state.errors ? (
                              <div style={{ color: "red" }}>
                                {this.state.errors.email}
                              </div>
                            ) : null}
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              name="email"
                              placeholder="john-doe.s@gmail.com"
                              id="standard-email"
                              value={this.state.email}
                              onChange={this.handleEmailChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled ? "disabled" : ""}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}></Grid>

                      {/* Phone number */}

                      <Grid item xs={1}></Grid>
                      <Grid item xs={9}>
                        <Grid container spacing={3}>
                          <Grid item xs={3} className="text-right">
                            <p>PHONE NUMBER</p>
                            {this.state.errors ? (
                              <div style={{ color: "red" }}>
                                {this.state.errors.phone}
                              </div>
                            ) : null}
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              name="phone"
                              id="standard-phone"
                              value={this.state.phone}
                              onChange={this.handlePhoneChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled ? "disabled" : ""}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}></Grid>

                      {/* Address */}

                      <Grid item xs={1}></Grid>
                      <Grid item xs={9}>
                        <Grid container spacing={3}>
                          <Grid item xs={3} className="text-right">
                            <p>WHERE YOU LIVE</p>
                            {this.state.errors ? (
                              <div style={{ color: "red" }}>
                                {this.state.errors.address}
                              </div>
                            ) : null}
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              name="address"
                              placeholder="Address"
                              id="standard-address"
                              value={this.state.address}
                              onChange={this.handleAddressChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled ? "disabled" : ""}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}></Grid>

                      {/* Description */}
                      <Grid item xs={1}></Grid>
                      <Grid item xs={9}>
                        <Grid container spacing={3}>
                          <Grid item xs={3} className="text-right">
                            <p>DESCRIBE YOURSELF</p>
                            {this.state.errors ? (
                              <div style={{ color: "red" }}>
                                {this.state.errors.description}
                              </div>
                            ) : null}
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              name="description"
                              placeholder="About you"
                              id="standard-description"
                              value={this.state.description}
                              onChange={this.handleDescriptionChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled ? "disabled" : ""}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}></Grid>

                      {/*Hourly Rate*/}
                      <Grid item xs={1}></Grid>
                      <Grid item xs={9}>
                        <Grid container spacing={3}>
                          <Grid item xs={3} className="text-right">
                            <p>YOUR HOURLY RATE</p>
                            {this.state.errors ? (
                              <div style={{ color: "red" }}>
                                {this.state.errors.rate}
                              </div>
                            ) : null}
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              name="rate"
                              placeholder="Your hourly rate"
                              id="standard-rate"
                              value={this.state.rate}
                              onChange={this.handleRateChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled ? "disabled" : ""}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}></Grid>

                      <Grid item xs={4}></Grid>

                      <Grid item xs={4} className="center">
                        <Button
                          fullWidth
                          size="large"
                          variant="contained"
                          className="submit-button"
                          onClick={this.handleSubmit}
                          disabled={this.state.disabled ? "disabled" : ""}
                        >
                          Save
                        </Button>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          fullWidth
                          size="large"
                          variant="contained"
                          className="submit-button"
                          onClick={this.enableEdit}
                          disabled={this.state.disabled ? "" : "disabled"}
                        >
                          Edit
                        </Button>
                      </Grid>

                      {this.state.edit === "1" ? (
                        <Grid item xs={2}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            size="large"
                            onClick={this.cancelEdit}
                          >
                            Cancel
                          </Button>
                        </Grid>
                      ) : (
                        <Grid item xs={2}></Grid>
                      )}
                      <Grid item xs={2}></Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        {/* <SimpleSnackbar></SimpleSnackbar> */}
      </div>
    );
  }
}

export default EditProfilePage;
