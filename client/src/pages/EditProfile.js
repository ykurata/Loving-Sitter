import React, { useState, useEffect } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Snackbar, IconButton } from "@material-ui/core";

import Navbar from "../components/Navbar";
import SideNavigationBar from "../components/SideNavBar";

const EditProfile = (props) => {
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    date: ""
  });
  const [profile, setProfile] = useState("");
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState("");
  const [formChange, setFormChange] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
 
  
  useEffect(() => {
    axios.get(`profile/get/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setProfile(res.data.profile);
      setUserInput({
        firstName: res.data.profile.firstName,
        lastName: res.data.profile.lastName,
        gender: res.data.profile.gender,
        birthDate: res.data.profile.birthDate,
        email: res.data.profile.email,
        phone: res.data.profile.phone,
        address: res.data.profile.address,
        description: res.data.profile.description,
        date: res.data.profile.date
      })
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

 
  const createProfile = e => {
    e.preventDefault();
    axios.post("profile/create", userInput, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setSnackBarMsg("Profile Saved" );
        setSnackbarOpen(true);
      })
      .catch(err => {
        setSnackBarMsg("Please fill up all the fields!");
        setSnackbarOpen(true);
        setErrors(err.response.data);
      });
  }

  const updateProfile = e => {
    e.preventDefault();
    axios.put(`profile/update/${userId}`, userInput, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUser(res.data.profile);
        setSnackBarMsg("Profile Saved" );
        setSnackbarOpen(true);
      })
      .catch(err => {
        setSnackBarMsg("Please fill up all the fields!");
        setSnackbarOpen(true);
        setErrors(err.response.data);
      });
  }

  const handleInputChange = e => {
    setUserInput({...userInput, [e.target.name]: e.target.value })
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (profile) {
      updateProfile();
    } else {
      createProfile();
    }
    setDisabled(true);
  };

  const snackbarClose = event => {
    setSnackbarOpen(false);
  };

  const enableEdit = e => {
    setDisabled(false);
  };

  const cancelEdit = event => {
    setDisabled(true);
  };

  
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={snackbarClose}
        message={<span id="message-id">{snackbarMsg}</span>}
        action={[
          <IconButton
            key="close"
            arial-label="Close"
            color="inherit"
            onClick={snackbarClose}
          ></IconButton>
        ]}
      />
      <Navbar/>
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
                  onSubmit={handleSubmit}
                >
                  <Grid container spacing={3} className="pb-1">

                    {/* First Name */}
            
                    <Grid item xs={1}></Grid>
                    <Grid item xs={9}>
                      <Grid container spacing={3}>
                        <Grid item xs={3} className="text-right">
                          <p>FIRST NAME</p>
                          {errors ? (
                            <div style={{ color: "red" }}>
                              {errors.firstName}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            name="firstName"
                            id="standard-firstName"
                            placeholder="John"
                            value={userInput.firstName}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            disabled={disabled}
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
                          {errors ? (
                            <div style={{ color: "red" }}>
                              {errors.lastName}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            name="lastName"
                            id="standard-lastName"
                            placeholder="Doe"
                            value={userInput.lastName}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            disabled={disabled}
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
                          {errors ? (
                            <div style={{ color: "red" }}>
                              {errors.gender}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            select
                            name="gender"
                            id="standard-gender"
                            label="gender"
                            value={userInput.gender}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            disabled={disabled}
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
                          {errors ? (
                            <div style={{ color: "red" }}>
                              {errors.birthDate}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            type="date"
                            name="birthDate"
                            id="standard-birthDate"
                            value={userInput.birthDate}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            disabled={disabled}
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
                          {errors ? (
                            <div style={{ color: "red" }}>
                              {errors.email}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            name="email"
                            placeholder="john-doe.s@gmail.com"
                            id="standard-email"
                            value={userInput.email}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            disabled={disabled}
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
                          {errors ? (
                            <div style={{ color: "red" }}>
                              {errors.phone}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            name="phone"
                            id="standard-phone"
                            value={userInput.phone}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            disabled={disabled}
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
                          {errors ? (
                            <div style={{ color: "red" }}>
                              {errors.address}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            name="address"
                            placeholder="Address"
                            id="standard-address"
                            value={userInput.address}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            disabled={disabled}
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
                          {errors ? (
                            <div style={{ color: "red" }}>
                              {errors.description}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            name="description"
                            placeholder="About you"
                            id="standard-description"
                            value={userInput.description}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            disabled={disabled}
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
                          {errors ? (
                            <div style={{ color: "red" }}>
                              {errors.rate}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            name="rate"
                            placeholder="Your hourly rate"
                            id="standard-rate"
                            type="number"
                            value={userInput.rate}
                            onChange={handleInputChange}
                            margin="normal"
                            variant="outlined"
                            disabled={disabled}
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
                        onClick={handleSubmit}
                        disabled={disabled}
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
                        onClick={enableEdit}
                        disabled={!disabled}
                      >
                        Edit
                      </Button>
                    </Grid>

                    {!disabled ? (
                      <Grid item xs={2}>
                        <Button
                          variant="outlined"
                          color="secondary"
                          fullWidth
                          size="large"
                          onClick={cancelEdit}
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

export default EditProfile;
