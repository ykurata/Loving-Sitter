import React, { Component } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Snackbar, IconButton } from "@material-ui/core";

import NavigationBar from "./Navbar";
import SideNavigationBar from "./SideNavBar";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("jwtToken"),
      userId: localStorage.getItem("userId"),
      user: {
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        email: "",
        phone: "",
        address: "",
        description: "",
        rate: ""
      },
      profile: "",
      errors: [],
      disabled: true,
      snackbaropen: false,
      snackbarmsg: "",
      formChanges: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    this.prefillProfile();
  }

  prefillProfile() {
    axios.get(`profile/get/${this.state.userId}`, {
        headers: { Authorization: `Bearer ${this.state.token}` }
      })
      .then(res => {
        if (res.data.profile) {
          this.setState({ 
            user: res.data.profile,
            profile: res.data.profile
          });
        }
      })
      .catch(err => {
        console.log({ err });
      });
  }

  createProfile() {
    axios.post("profile/create", this.state.user, {
        headers: { Authorization: `Bearer ${this.state.token}` }
      })
      .then(res => {
        this.setState({ user: res.data });
        this.setState({ snackbarmsg: "Profile Saved" });
        this.setState({ snackbaropen: true });
      })
      .catch(err => {
        this.setState({ snackbarmsg: "Please fill up all the fields!" });
        this.setState({ snackbaropen: true });
        this.setState({
          errors: err.response.data
        })
      });
  }

  updateProfile() {
    axios.put(`profile/update/${this.state.userId}`, this.state.user, {
        headers: { Authorization: `Bearer ${this.state.token}` }
      })
      .then(res => {
        this.setState({ user: res.data });
        this.setState({ snackbarmsg: "Profile Saved" });
        this.setState({ snackbaropen: true });
      })
      .catch(err => {
        this.setState({ snackbarmsg: "Please fill up all the fields!" });
        this.setState({ snackbaropen: true });
        this.setState({
          errors: err.response.data
        })
      });
  }

  handleInputChange = event => {
    const field = event.target.name;
    let user = { ...this.state.user };
    user[field] = event.target.value;
    this.setState({ user });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.profile) {
      this.updateProfile();
    } else {
      this.createProfile();
    }

    this.setState({ disabled: true });
  };

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
            vertical: "top",
            horizontal: "center"
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

                      {/* First Name */}
              
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
                              value={this.state.user.firstName}
                              onChange={this.handleInputChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled}
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
                              value={this.state.user.lastName}
                              onChange={this.handleInputChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled}
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
                              onChange={this.handleInputChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled}
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
                              value={this.state.user.birthDate}
                              onChange={this.handleInputChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled}
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
                              value={this.state.user.email}
                              onChange={this.handleInputChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled}
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
                              value={this.state.user.phone}
                              onChange={this.handleInputChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled}
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
                              value={this.state.user.address}
                              onChange={this.handleInputChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled}
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
                              value={this.state.user.description}
                              onChange={this.handleInputChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled}
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
                              type="number"
                              value={this.state.user.rate}
                              onChange={this.handleInputChange}
                              margin="normal"
                              variant="outlined"
                              disabled={this.state.disabled}
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
                          disabled={this.state.disabled}
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
                          disabled={!this.state.disabled}
                        >
                          Edit
                        </Button>
                      </Grid>

                      {!this.state.disabled ? (
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

export default EditProfile;
