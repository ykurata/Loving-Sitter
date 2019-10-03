import React, { Component } from "react";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import Button from "@material-ui/core/Button";

const initalState = {
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  phone: "",
  address: "",
  description: ""
};

class ProfilePage extends Component {
  state = initalState;

  handleFirstNameChange = event => {
    this.setState({ firstName: event.target.value });
  };

  handleLastNameChange = event => {
    this.setState({ lastName: event.target.value });
  };

  handleGenderChange = event => {
    this.setState({ gender: event.target.value });
  };

  handleDobChange = event => {
    this.setState({ dob: event.target.value });
  };

  handlePhoneChange = event => {
    this.setState({ phone: event.target.value });
  };

  handleAddressChange = event => {
    this.setState({ address: event.target.value });
  };

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div className="pageArea">
        <div className="menuArea">
          <MenuList>
            <MenuItem component={Link} to="/">
              Edit Profile
            </MenuItem>
            <MenuItem component={Link} to="/profile-photo">
              Profile Photo
            </MenuItem>
            <MenuItem component={Link} to="/payment">
              Payment
            </MenuItem>
            <MenuItem component={Link} to="/security">
              Security
            </MenuItem>
            <MenuItem component={Link} to="/settings">
              Settings
            </MenuItem>
          </MenuList>
        </div>
        <div className="settingsArea">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h1>Edit Profile</h1>
            </Grid>
            <Grid item xs={12}>
              <form noValidate autoComplete="off" method="POST">
                <Grid container spacing={3}>
                  <Grid item xs={4}></Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="firstName"
                      id="standard-firstName"
                      label="firstName"
                      value={this.handleFirstName}
                      onChange={this.handleFirstNameChange}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>

                  <Grid item xs={4}></Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="lastName"
                      id="standard-lastName"
                      label="lastName"
                      value={this.handleLastName}
                      onChange={this.handleLastNameChange}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>

                  <Grid item xs={4}></Grid>

                  <Grid item xs={6}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="gender"
                      value={this.handleGender}
                      onChange={this.handleGenderChange}
                      inputProps={{
                        name: "gender",
                        id: "age-helper"
                      }}
                    >
                      <MenuItem value="">
                        <em>Gender</em>
                      </MenuItem>
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={2}></Grid>

                  <Grid item xs={4}></Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="dob"
                      id="standard-dob"
                      label="dob"
                      value={this.handleDob}
                      onChange={this.handleDobChange}
                      margin="normal"
                      type="date"
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>

                  <Grid item xs={4}></Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="email"
                      id="standard-email"
                      label="email"
                      value={this.handleEmail}
                      onChange={this.handleEmailChange}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>

                  <Grid item xs={4}></Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="phone"
                      id="standard-phone"
                      label="phone"
                      value={this.handlePhone}
                      onChange={this.handlePhoneChange}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>

                  <Grid item xs={4}></Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="address"
                      id="standard-address"
                      label="address"
                      value={this.handleAddress}
                      onChange={this.handleAddressChange}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>

                  <Grid item xs={4}></Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="description"
                      id="standard-description"
                      label="description"
                      value={this.handleDescription}
                      onChange={this.handleDescriptionChange}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>

                  <Grid item xs={12}>
                    <Button variant="contained" onClick={this.handleSubmit}>
                      Default
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
