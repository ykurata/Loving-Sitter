import React, { useState, useEffect } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Snackbar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";
import SideNavigationBar from "../components/SideNavBar";

const photoStyles = makeStyles(theme => ({
  root: {
    marginTop: 100,
  },
  title: {
    marginBottom: 50,
    [theme.breakpoints.down('xs')]: {
      fontSize: 35
    },
  },
  photoForm: {
    textAlign: "center",
    backgroundColor: "white",
    width: "80%",
    margin: "auto",
    padding: 50,
    marginBottom: 50,
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      padding: 10
    },
  },
  bigAvatar: {
    width: 300,
    height: 300,
    margin: "auto",
    marginBottom: 20
  },
  button: {
    marginTop: 30
  }
}));

const Photo = (props) => {
  const classes = photoStyles();
  const [file, setFile] = useState(null);
  const [sendFile, setSendFile] = useState(null);
  
  const handlePhotoChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setSendFile(e.target.files[0]);
  }

  const handleSubmit = e => {
    e.preventDefault();
    let image = sendFile;
    if (image) {
      let formData = new FormData();
      formData.append("image", image);
      axios.post("/files/image-upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log({ err });
      });
    }
  };

 
  return (
    <div>
      {/* <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={this.state.snackbaropen}
        autoHideDuration={3000}
        onClose={snackbarClose}
        message={<span id="message-id">{this.state.snackbarmsg}</span>}
        action={[
          <IconButton
            key="close"
            arial-label="Close"
            color="inherit"
            onClick={this.snackbarClose}
          ></IconButton>
        ]}
      /> */}
      <Navbar/>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={2} md={2} >
          <div className={classes.sideNav}>
            <SideNavigationBar/>
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={10}>
          <form onSubmit={handleSubmit} className={classes.photoForm}>
            <Typography  className={classes.title} variant="h3">Edit Profile</Typography>
            <Avatar
              alt="Your Profile Picture"
              src={file}
              className={classes.bigAvatar}
            />
            <Typography variant="body2">
              Make sure your photo clearly shows your face
            </Typography>
            <Button
              variant="contained"
              component="label"
              className={classes.button}
            >
              Upload File
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
            </Button>
            <Button
              fullWidth
              size="large"
              variant="contained"
              type="submit"
              color="secondary"
              className={classes.button}
            >
              Save
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default Photo;
