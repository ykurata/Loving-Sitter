import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postProfileImage } from "../actions/profileActions";
import { closeSnackbar } from "../actions/snackbarActions";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Snackbar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";
import SideNavigationBar from "../components/SideNavBar";

const photoStyles = makeStyles((theme) => ({
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
  bigAvatar: {
    width: 300,
    height: 300,
    margin: "auto",
    marginBottom: 20,
    [theme.breakpoints.down("xs")]: {
      width: 200,
      height: 200,
    },
  },
  button: {
    marginTop: 30,
  },
  error: {
    color: "red",
  },
}));

const Photo = (props) => {
  const classes = photoStyles();
  const [file, setFile] = useState(null);
  const [sendFile, setSendFile] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar);
  const token = localStorage.getItem("jwtToken");

  const handlePhotoChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setSendFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let image = sendFile;
    if (!image) {
      setError("Please select an image");
    } else {
      let formData = new FormData();
      formData.append("image", image);
      dispatch(postProfileImage(formData, token));
    }
  };

  const snackbarClose = (event) => {
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
        autoHideDuration={3000}
        onClose={snackbarClose}
        message={<span id="message-id">{snackbar.snackbarMsg}</span>}
        action={[
          <IconButton
            key="close"
            arial-label="Close"
            color="inherit"
            onClick={snackbarClose}
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
                <Avatar
                  alt="Your Profile Picture"
                  src={file}
                  className={classes.bigAvatar}
                />
                {error ? (
                  <Typography variant="body2" className={classes.error}>
                    {error}
                  </Typography>
                ) : null}

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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Photo;
