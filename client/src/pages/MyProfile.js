import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Snackbar, IconButton } from "@material-ui/core";

import Navbar from "../components/Navbar";

const MyProfileStyle = makeStyles(theme => ({
  avatar: {
    width: 300,
    height: 300,
    marginTop: "30px",
    marginBottom: "30px"
  },
  marginHorizontal: {
    marginLeft: 60,
    marginRight: 30,
    marginBottom: 30
  },
  squareBackground: {
    borderRadius: 0,
    width: 300,
    height: 300
  }
}));

const MyProfile = (props) => {
  const classes = MyProfileStyle();
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  
  useEffect(() => {
    axios.get(`/profile/get/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setProfile(res.data.profile);
    })
    .catch(err => {
      console.log("Error fetching and parsing data", err);
    });
  }, [])

  const snackbarClose = e => {
    setSnackbarOpen(false);
  };

  console.log(profile)

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
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
      <Grid container justify="center" style={{ marginTop: "50px"}}>
        <Grid item xs={7}>
          <Grid container align="center">
            <Box width={1} boxShadow={2} style={{marginBottom: "30px"}}>
              <Grid item>
                {profile.photoUrl ?
                  <Avatar
                    alt="Your Profile Picture"
                    src={profile.photoUrl}
                    className={classes.avatar}
                  />
                : <AccountCircleIcon className={classes.avatar} color="disabled"/> 
                }
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {profile.firstName} {profile.lastName}
                </Typography>
              </Grid>
              <Grid container justify="center" style={{marginTop: "30px"}}> 
                <RoomIcon  color="secondary" />
                <Typography variant="subtitle1">{profile.address}</Typography>
                <Grid item style={{ marginLeft: "100px"}}>
                  <Typography variant="subtitle1">
                    <Box fontWeight="fontWeightBold">
                      $ {profile.rate}/hr
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs={11}
                align="left"
                style={{marginTop: "30px"}}
              > 
                <Typography
                  className={classes.marginHorizontal}
                  variant="body1"
                  component="div"
                > 
                  <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">
                    About Me
                  </Box><br></br>
                  {profile.description}
                </Typography>
              </Grid>
              <Grid item style={{marginBottom: "30px"}} >
                <Button variant="outlined" color="primary" component={Link} to={'/profile'}>Edit Profile</Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyProfile;
