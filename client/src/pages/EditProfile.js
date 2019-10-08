import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import NavigationBar from "./Navbar";

import SideNavigationBar from "./SideNavBar";

import Button from "@material-ui/core/Button";

import SimpleSnackbar from "./snackbar";
import { Snackbar, IconButton } from "@material-ui/core";

const initalState = {
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  phone: "",
  address: "",
  description: "",
  disabled: true,
  snackbaropen: true,
  snackbarmsg: "wow"
};

class EditProfilePage extends Component {
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
    this.setState({ disabled: false });
  };

  render() {
    return (
      <div>
        <Snackbar
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
                  <form noValidate autoComplete="off" method="POST">
                    <Grid container spacing={3} className="pb-1">
                      <Grid item xs={1}></Grid>
                      <Grid item xs={9}>
                        <Grid container spacing={3}>
                          <Grid item xs={5} className="text-right">
                            <p>FIRST NAME</p>
                          </Grid>
                          <Grid item xs={7}>
                            <TextField
                              name="firstName"
                              id="standard-firstName"
                              placeholder="John"
                              value={this.handleFirstName}
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
                          <Grid item xs={5} className="text-right">
                            <p>LAST NAME</p>
                          </Grid>
                          <Grid item xs={7}>
                            <TextField
                              name="lastName"
                              id="standard-lastName"
                              placeholder="Doe"
                              value={this.handleLastName}
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
                          <Grid item xs={5} className="text-right">
                            <p>GENDER</p>
                          </Grid>
                          <Grid item xs={7}>
                            <TextField
                              select
                              name="gender"
                              id="standard-gender"
                              label="gender"
                              value={this.handleGender}
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
                          <Grid item xs={5} className="text-right">
                            <p>BIRTH DATE</p>
                          </Grid>
                          <Grid item xs={7}>
                            <TextField
                              type="date"
                              name="dob"
                              id="standard-dob"
                              value={this.handleDob}
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
                          <Grid item xs={5} className="text-right">
                            <p>EMAIL ADDRESS</p>
                          </Grid>
                          <Grid item xs={7}>
                            <TextField
                              name="email"
                              placeholder="john-doe.s@gmail.com"
                              id="standard-email"
                              value={this.handleEmail}
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
                          <Grid item xs={5} className="text-right">
                            <p>PHONE NUMBER</p>
                          </Grid>
                          <Grid item xs={7}>
                            <TextField
                              name="phone"
                              id="standard-phone"
                              value={this.handlePhone}
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
                          <Grid item xs={5} className="text-right">
                            <p>WHERE YOU LIVE</p>
                          </Grid>
                          <Grid item xs={7}>
                            <TextField
                              name="address"
                              placeholder="Address"
                              id="standard-address"
                              value={this.handleAddress}
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
                          <Grid item xs={5} className="text-right">
                            <p>DESCRIBE YOURSELF</p>
                          </Grid>
                          <Grid item xs={7}>
                            <TextField
                              name="description"
                              placeholder="About you"
                              id="standard-description"
                              value={this.handleDescription}
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
                      <Grid item xs={2}></Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <SimpleSnackbar></SimpleSnackbar>
      </div>
    );
  }
}

export default EditProfilePage;
