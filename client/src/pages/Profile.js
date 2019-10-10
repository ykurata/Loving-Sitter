import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import Button from "@material-ui/core/Button";

import axios from "axios";

const initalState = {
  firstName: "",
  lastName: "",
  gender: "",
  birthDate: "",
  email: "",
  phone: "",
  location: "",
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
    this.setState({ birthDate: event.target.value });
  };

  handlePhoneChange = event => {
    this.setState({ phone: event.target.value });
  };

  handleLocationChange = event => {
    this.setState({ location: event.target.value });
  };

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    axios.post('http://localhost:3001/profile', this.state)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
  };

  render() {
    return (
      <div className="pageArea">
        <div className="menuArea">
          <MenuList>
            <MenuItem component={Link} to="/">
              Edit Profile
            </MenuItem>
            <MenuItem component={Link} to="/photo">
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
                      name="birthDate"
                      id="standard-birthDate"
                      label="birthDate"
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
                      name="location"
                      id="standard-location"
                      label="location"
                      value={this.handleLocation}
                      onChange={this.handleLocationChange}
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
                    <Button type="submit" variant="contained" onClick={this.handleSubmit}>
                      Submit
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
