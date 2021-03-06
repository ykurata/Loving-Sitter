import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../actions/profileActions";
import { sendRequest } from "../actions/requestActions";
import { closeSnackbar } from "../actions/snackbarActions";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import RoomIcon from "@material-ui/icons/Room";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Snackbar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";

const ProfileDetailsStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
    padding: 50,
    [theme.breakpoints.down("xs")]: {
      padding: 20,
    },
  },
  detailCard: {
    marginBottom: 50,
  },
  avatar: {
    width: 300,
    height: 300,
    marginTop: 30,
    marginBottom: 30,
    [theme.breakpoints.down("xs")]: {
      width: 200,
      height: 200,
    },
  },
  name: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
  detail: {
    marginTop: 30,
    marginBottom: 30,
  },
  description: {
    margin: 10,
    [theme.breakpoints.up("sm")]: {
      margin: 30,
    },
  },
  requestCard: {
    marginLeft: 0,
    padding: 30,
    [theme.breakpoints.up("md")]: {
      marginLeft: 20,
    },
  },
  date: {
    marginBottom: 20,
  },
  error: {
    color: "red",
  },
}));

const ProfileDetails = (props) => {
  const classes = ProfileDetailsStyles();
  const [userInput, setUserInput] = useState({
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");
  const token = localStorage.getItem("jwtToken");
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const snackbar = useSelector((state) => state.snackbar);

  useEffect(() => {
    dispatch(getProfile(props.match.params.id, token));
  }, []);

  const handleInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (userInput.startDate === "" || userInput.endDate === "") {
      setError("Please select both dates");
    } else {
      const request = {
        recieverId: props.match.params.id,
        startDate: userInput.startDate,
        endDate: userInput.endDate,
      };
      dispatch(sendRequest(request, token));
    }
  };

  const snackbarClose = (e) => {
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
        <Grid item xs={12}>
          <Button component={Link} to={"../sitter-search"}>
            &lt; Back to list
          </Button>
        </Grid>

        <Grid item sm={12} md={8} align="center">
          <Card className={classes.detailCard}>
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
              <Typography variant="h4" className={classes.name}>
                {profile.firstName} {profile.lastName}
              </Typography>
              <Grid container justify="center" className={classes.detail}>
                <RoomIcon color="secondary" />
                <Typography variant="subtitle1">{profile.address}</Typography>
              </Grid>
              <Grid item align="left">
                <Typography
                  className={classes.description}
                  variant="body1"
                  component="div"
                >
                  <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">
                    About Me
                  </Box>
                  <br></br>
                  {profile.description}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card className={classes.requestCard}>
            <CardContent align="center">
              <Typography variant="h4">${profile.rate}/hr</Typography>
              <Rating value={5} readOnly className={"mb-1"} />
              {error ? (
                <Typography variant="body2" className={classes.error}>
                  Please select both dates
                </Typography>
              ) : null}
              <Grid container>
                <Grid item xs={12} className={classes.date}>
                  <TextField
                    id="drop-in"
                    label="Drop In"
                    name="startDate"
                    type="date"
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} className={classes.date}>
                  <TextField
                    id="drop-out"
                    label="Drop Out"
                    name="endDate"
                    type="date"
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={onSubmit}
              >
                Send Request
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileDetails;
