import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../actions/profileActions";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typograhy from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";

const ProfileListStyle = makeStyles((theme) => ({
  root: {
    marginTop: 80,
  },
  title: {
    fontSize: "7vmin",
  },
  avatar: {
    width: 100,
    height: 100,
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px",
  },
  card: {
    width: 345,
    maxWidth: 345,
    margin: "30px",
  },
  location: {
    height: 50,
  },
}));

const ProfileList = () => {
  const classes = ProfileListStyle();
  const [userInput, setUserInput] = useState({
    location: "",
    date: "",
  });
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("jwtToken");
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile.profiles);
  const loading = useSelector((state) => state.profile.loading);

  // Update user input
  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getProfiles(token));
  }, []);

  let filteredProfiles = profiles.filter((profile) => {
    return (
      profile.address
        .toLowerCase()
        .indexOf(userInput.location.toLocaleLowerCase()) !== -1
    );
  });

  return (
    <div>
      <Navbar />
      <Grid container className={classes.root} justify="center">
        <Grid item xs={12} align="center">
          <Typograhy variant="h3" className={classes.title}>
            Find Dog Sitters
          </Typograhy>
        </Grid>
        <Grid item xs={4}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="secondary" />
                </InputAdornment>
              ),
            }}
            id="outlined-bare"
            name="location"
            placeholder="Search Location"
            margin="normal"
            variant="outlined"
            value={userInput.location}
            onChange={onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            type="date"
            name="date"
            id="standard-selectedDate"
            value={userInput.date}
            onChange={onChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <ProfileCard
          data={filteredProfiles}
          loading={loading}
          userId={userId}
        />
      </Grid>
    </div>
  );
};

export default ProfileList;
