import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { createProfile, updateProfile } from "../actions/profileActions";
import { closeSnackbar } from "../actions/snackbarActions";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Snackbar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";
import SideNavigationBar from "../components/SideNavBar";

const EditProfileStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
  },
  title: {
    marginBottom: 50,
    [theme.breakpoints.down("xs")]: {
      fontSize: 35,
    },
  },
  card: {
    width: "60%",
    margin: "auto",
    padding: 50,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      width: "80%",
      padding: 10,
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  sideNav: {
    width: "70%",
    paddingLeft: 100,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      paddingLeft: 15,
    },
    [theme.breakpoints.down("xs")]: {
      width: "40%",
    },
  },
  error: {
    color: "red",
    textAlign: "left",
  },
  gender: {
    textAlign: "left",
  },
}));

const EditProfile = (props) => {
  const classes = EditProfileStyles();
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    rate: "",
  });
  const [profile, setProfile] = useState("");
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    axios
      .get(`profile/get/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
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
          rate: res.data.profile.rate,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (profile) {
      dispatch(updateProfile(userId, userInput, token));
    } else {
      dispatch(createProfile(userInput, token));
    }
  };

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={snackbar.snackbarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        message={<span id="message-id">{snackbar.snackbarMsg}</span>}
        action={[
          <IconButton
            key="close"
            arial-label="Close"
            color="inherit"
            onClick={handleClose}
          ></IconButton>,
        ]}
      />
      <Navbar />
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={2} md={2}>
          <div className={classes.sideNav}>
            <SideNavigationBar />
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={10}>
          <Card className={classes.card}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Typography className={classes.title} variant="h3">
                  Edit Profile
                </Typography>
                <Grid container spacing={3}>
                  {/* First Name */}
                  <Grid item xs={3}>
                    <p>FIRST NAME</p>
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
                      fullWidth
                    />
                    {error ? (
                      <div className={classes.error}>{error.firstName}</div>
                    ) : null}
                  </Grid>
                  {/* Last name */}
                  <Grid item xs={3}>
                    <p>LAST NAME</p>
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
                      fullWidth
                    />
                    {error ? (
                      <div className={classes.error}>{error.lastName}</div>
                    ) : null}
                  </Grid>
                  {/* Gender */}
                  <Grid item xs={3}>
                    <p>GENDER</p>
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
                      fullWidth
                      className={classes.gender}
                    >
                      <MenuItem value="">
                        <em>Gender</em>
                      </MenuItem>
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                    </TextField>
                    {error ? (
                      <div className={classes.error}>{error.gender}</div>
                    ) : null}
                  </Grid>
                  {/* DOB */}
                  <Grid item xs={3}>
                    <p>BIRTH DATE</p>
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
                      fullWidth
                    />
                    {error ? (
                      <div className={classes.error}>{error.birthDate}</div>
                    ) : null}
                  </Grid>
                  {/* Email */}
                  <Grid item xs={3}>
                    <p>EMAIL ADDRESS</p>
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
                      fullWidth
                    />
                    {error ? (
                      <div className={classes.error}>{error.email}</div>
                    ) : null}
                  </Grid>
                  {/* Phone number */}
                  <Grid item xs={3}>
                    <p>PHONE NUMBER</p>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      name="phone"
                      id="standard-phone"
                      value={userInput.phone}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    {error ? (
                      <div className={classes.error}>{error.phone}</div>
                    ) : null}
                  </Grid>
                  {/* Address */}
                  <Grid item xs={3}>
                    <p>WHERE YOU LIVE</p>
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
                      fullWidth
                    />
                    {error ? (
                      <div className={classes.error}>{error.address}</div>
                    ) : null}
                  </Grid>
                  {/* Description */}
                  <Grid item xs={3}>
                    <p>DESCRIBE YOURSELF</p>
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
                      fullWidth
                    />
                    {error ? (
                      <div className={classes.error}>{error.description}</div>
                    ) : null}
                  </Grid>
                  {/*Hourly Rate*/}
                  <Grid item xs={3}>
                    <p>YOUR HOURLY RATE</p>
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
                      fullWidth
                    />
                    {error ? (
                      <div className={classes.error}>{error.rate}</div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      color="secondary"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditProfile;
