import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import Navbar from "../components/Navbar";

const MyProfileStyle = makeStyles((theme) => ({
  root: {
    marginTop: 100,
  },
  card: {
    width: "60%",
    margin: "auto",
    padding: 50,
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding: 10,
    },
  },
  text: {
    marginBottom: 10,
  },
  avatar: {
    width: 300,
    height: 300,
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      width: 200,
      height: 200,
    },
  },
  rate: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
}));

const MyProfile = (props) => {
  const classes = MyProfileStyle();
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`/profile/get/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data.profile);
      })
      .catch((err) => {
        console.log("Error fetching and parsing data", err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Grid container className={classes.root} justify="center">
        {profile ? (
          <Card className={classes.card}>
            {profile.photoUrl ? (
              <Avatar
                alt="Your Profile Picture"
                src={profile.photoUrl}
                className={classes.avatar}
              />
            ) : (
              <AccountCircleIcon className={classes.avatar} color="disabled" />
            )}
            <CardContent>
              <Typography variant="h4" className={classes.text}>
                {profile.firstName} {profile.lastName}
              </Typography>
              <Grid container justify="center" className={classes.text}>
                <RoomIcon color="secondary" />
                <Typography variant="subtitle1">{profile.address}</Typography>
              </Grid>
              <Typography variant="subtitle1" className={classes.rate}>
                $ {profile.rate} /hr
              </Typography>
              <Grid item align="left">
                <Typography variant="body1" component="div">
                  <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">
                    About Me
                  </Box>
                  <br></br>
                  {profile.description}
                </Typography>
              </Grid>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                component={Link}
                to={"/profile"}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className={classes.card}>
            <Typography variant="h6">No Profile</Typography>
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              component={Link}
              to={"/profile"}
            >
              Edit Profile
            </Button>
          </Card>
        )}
      </Grid>
    </div>
  );
};

export default MyProfile;
