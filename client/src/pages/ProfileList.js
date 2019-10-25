import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "../App.scss";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Avatar from "@material-ui/core/Avatar";
import NavigationBar from "./Navbar";

import { withStyles } from "@material-ui/core/styles";

import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import RoomIcon from "@material-ui/icons/Room";

import TextField from "@material-ui/core/TextField";

import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";

import "date-fns";
import axios from "axios";
import { Link } from 'react-router-dom';



const photoPageStyle = theme => ({
  bigAvatar: {
    width: 100,
    height: 100,
    margin: "auto"
  },

  cardDivider: {
    borderBottom: "2px solid lightgrey"
  },

  dateOutline: {
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "4px",
    height: "85%"
  }
});

const initalState = {
  user: {
    location: "",
    selectedDate: ""
  },
  profiles: []
};

class ProfileListPage extends Component {
  state = initalState;

  handleLocationChange = event => {
    let user = { ...this.state.user };
    user.location = event.target.value;
    this.setState({ user });
  };

  handleDateChange = event => {
    let user = { ...this.state.user };
    user.selectedDate = event.target.value;
    this.setState({ user });
  };

  componentDidMount() {
    // Get token from local storage
    const token = localStorage.getItem("jwtToken");

    axios.get("/profile/get", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        this.setState({
          profiles: res.data.profile
        });
      })
      .catch(err => {
        console.log("Error fetching and parsing data", err);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavigationBar></NavigationBar>
        <Grid container>
          <Grid item xs={12} className="center">
            <h1>Your search results</h1>
          </Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Grid container spacing={3}>
              <Grid item xs={3}></Grid>
              <Grid item xs={4} className="pr-0">
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="secondary" />
                      </InputAdornment>
                    )
                  }}
                  id="outlined-bare"
                  placeholder="Search Location"
                  margin="normal"
                  variant="outlined"
                  value={this.state.location}
                  onChange={this.handleLocationChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2} className="pl-0">
                <TextField
                  type="date"
                  name="selectedDate"
                  id="standard-selectedDate"
                  value={this.state.selectedDate}
                  onChange={this.handleDateChange}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}></Grid>
                  {/*Checks if the location search bar is empty, if not, inputs based on address*/}
              {this.state.user.location.length > 0 ? this.state.profiles.map((profile, key) =>
                profile.address.toLowerCase().includes(this.state.user.location.toLowerCase()) &&
                  <Grid item xs={4} align="center" key={key} component={Link} to={`/profile-details/${profile.userId}`} style={{ textDecoration: 'none' }}>
                    <Card>
                      <CardActionArea className={classes.cardDivider}>
                        <CardContent>
                          <Grid container>
                            <Grid item xs={4}></Grid>

                            <Grid item xs={4}>
                              <Avatar
                                alt="Remy Sharp"
                                src={profile.photoUrl}
                                className={classes.bigAvatar}
                              />
                            </Grid>
                            <Grid item xs={4}></Grid>
                          </Grid>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className="mb-0 center"
                          >
                            {profile.firstName} {profile.lastName}
                          </Typography>

                          <Typography
                            variant="body1"
                            color="textSecondary"
                            className="center"
                            component="p"
                          >
                            Loving Pet
                      </Typography>

                          <Grid container spacing={3}>
                            <Grid item xs={12} className="center">
                              <Box component="fieldset" borderColor="transparent">
                                <Rating value={5} readOnly />
                              </Box>
                            </Grid>
                          </Grid>

                          <Typography
                            variant="body1"
                            className="center"
                            component="p"
                            noWrap
                          >
                            <b>{profile.description}</b>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Grid container spacing={3}>
                          <Grid item xs={1}>
                            <RoomIcon color="secondary" />
                          </Grid>
                          <Grid item xs={8}>
                            <p className="mt-0 mb-0">{profile.address}</p>
                          </Grid>
                          <Grid item xs={2}>
                            <b>
                              {" "}
                              <p className="mt-0 mb-0">${profile.rate}/hr </p>
                            </b>
                          </Grid>
                          <Grid item xs={1}></Grid>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
              )
                :
                this.state.profiles.map((profile, key) =>
                  <Grid item xs={4} align="center" key={key} component={Link} to={`/profile-details/${profile.userId}`} style={{ textDecoration: 'none' }}>
                    <Card>
                      <CardActionArea className={classes.cardDivider}>
                        <CardContent>
                          <Grid container>
                            <Grid item xs={4}></Grid>

                            <Grid item xs={4}>
                              <Avatar
                                alt="Remy Sharp"
                                src={profile.photoUrl}
                                className={classes.bigAvatar}
                              />
                            </Grid>
                            <Grid item xs={4}></Grid>
                          </Grid>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className="mb-0 center"
                          >
                            {profile.firstName} {profile.lastName}
                          </Typography>

                          <Typography
                            variant="body1"
                            color="textSecondary"
                            className="center"
                            component="p"
                          >
                            Loving Pet
                      </Typography>

                          <Grid container spacing={3}>
                            <Grid item xs={12} className="center">
                              <Box component="fieldset" borderColor="transparent">
                                <Rating value={5} readOnly />
                              </Box>
                            </Grid>
                          </Grid>

                          <Typography
                            variant="body1"
                            className="center"
                            component="p"
                            noWrap
                          >
                            <b>{profile.description}</b>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Grid container spacing={3}>
                          <Grid item xs={1}>
                            <RoomIcon color="secondary" />
                          </Grid>
                          <Grid item xs={8}>
                            <p className="mt-0 mb-0">{profile.address}</p>
                          </Grid>
                          <Grid item xs={2}>
                            <b>
                              {" "}
                              <p className="mt-0 mb-0">${profile.rate}/hr </p>
                            </b>
                          </Grid>
                          <Grid item xs={1}></Grid>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              }

            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(photoPageStyle)(ProfileListPage);
