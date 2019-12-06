import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";
import { Snackbar, IconButton } from "@material-ui/core";

import NavigationBar from "./Navbar";


const MyProfileStyle = theme => ({
  bigAvatar: {
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
});

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      token: localStorage.getItem("jwtToken"),
      snackbaropen: false,
      snackbarmsg: ""  
    }
  };

  componentDidMount() {
    axios.get(`/profile/get/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${this.state.token}` }
      })
      .then(res => {
        this.setState({
          profile: res.data.profile,
        });
      })
      .catch(err => {
        console.log("Error fetching and parsing data", err);
      });
  }

  snackbarClose = event => {
    this.setState({ snackbaropen: false });
  };

  render() {
    const { classes } = this.props;
    const { profile } = this.state;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            ></IconButton>
          ]}
        />

        <NavigationBar></NavigationBar>

        <Grid container justify="center" style={{ marginTop: "50px"}}>
          <Grid item xs={7}>
            <Grid container align="center">
              <Box width={1} boxShadow={2} style={{marginBottom: "30px"}}>
                <Grid item>
                  <Avatar
                    alt="Your Profile Picture"
                    src={profile.photoUrl}
                    className={classes.bigAvatar}
                  />
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
}

export default withStyles(MyProfileStyle)(MyProfile);
