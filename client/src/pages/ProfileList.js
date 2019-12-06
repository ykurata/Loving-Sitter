import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import RoomIcon from "@material-ui/icons/Room";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import NavigationBar from "./Navbar";

import "date-fns";

const ProfileListStyle = theme => ({
  avatar: {
    width: 100,
    height: 100,
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px"
  },
  card: {
    width: 345,
    maxWidth: 345,
    margin: "30px"
  },
  location: {
    height: 50
  }
});

class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      date: "",
      profiles: [],
      userId: localStorage.getItem("userId")
    }
  }
  
  // Update user input
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

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
    const { profiles } = this.state;
    let filteredProfiles = this.state.profiles.filter(
      (profile) => {
        return profile.address.toLowerCase().indexOf(
          this.state.location.toLocaleLowerCase()) !== -1;
      }
    );

    let listProfiles;
    if (profiles.length > 0) {
      listProfiles = filteredProfiles.map((profile, i) => 
        profile.userId !== this.state.userId ?
          <Card className={classes.card} key={i} component={Link} to={`/profile-details/${profile.userId}`} style={{ textDecoration: 'none' }}>
            <CardActionArea>
              <CardContent>
                <Grid container>
                  <Avatar className={classes.avatar} src={profile.photoUrl}/>
                </Grid>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Box component="fieldset" mb={3} borderColor="transparent" align="center">
                  <Rating value={5} readOnly />
                </Box>
                <Typography variant="body2" color="textSecondary" component="p" noWrap align="center">
                  {profile.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Divider />
            <CardActions className={classes.location}>
              <Grid container>
                <RoomIcon color="secondary" />
                <Grid item xs={8}>
                  <Typography component='span' variant="body1">{profile.address}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography  component='span' variant="body1">
                    <Box textAlign="right" fontWeight="fontWeightBold">
                      $ {profile.rate}/hr
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            </CardActions>
          </Card>   
        : null   
      )
    } else {
      listProfiles = <Typography variant="h6" align="center" style={{ marginTop: "30px"}}>There is no profiles</Typography>           
    }

    return (
      <div>
        <NavigationBar></NavigationBar>
        <Grid container justify="center">
          <Grid item xs={12} align='center'>
            <h1>Find Dog Sitters</h1>
          </Grid>
          <Grid item xs={4}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="secondary" />
                  </InputAdornment>
                )
              }}
              id="outlined-bare"
              name="location"
              placeholder="Search Location"
              margin="normal"
              variant="outlined"
              value={this.state.location}
              onChange={this.onChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="date"
              name="date"
              id="standard-selectedDate"
              value={this.state.date}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </Grid>    
          <Grid container justify="center">
            {listProfiles}
          </Grid> 
        </Grid>
      </div>
    );
  }
}
export default withStyles(ProfileListStyle)(ProfileList);
