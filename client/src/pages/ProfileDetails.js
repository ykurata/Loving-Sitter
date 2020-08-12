import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import RoomIcon from "@material-ui/icons/Room";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Snackbar, IconButton } from "@material-ui/core";

import Navbar from "../components/Navbar";


const detailsStyle = theme => ({
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
  },
  requestBtn: {
    backgroundColor: "red",
    color: "white"
  },
  statusCard: {
    marginBottom: 30,
    width: "80%",
    margin: "auto",
    lineHeight: "26px"
  }
});

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      startDate: "",
      endDate: "",
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

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendRequest = () => {
    const request = {
      recieverId: this.props.match.params.id,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }

    axios.post("/request", request, {
        headers: { Authorization: `Bearer ${this.state.token}` }
      })
      .then(res => {
        console.log(res.data);
        this.setState({ snackbarmsg: "Request was sent" });
        this.setState({ snackbaropen: true });
      })
      .catch(err => {
        this.setState({ snackbarmsg: `${err.response.data.error}` });
        this.setState({ snackbaropen: true });
        console.log(err);
      });
  };
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

        <Navbar />

        <Grid container >
          <Grid item xs={1}></Grid>
          <Grid item xs={11}>
            <Button component={Link} to={"../sitter-search"}>
              &lt; Back to list
            </Button>
          </Grid>
          <Grid item xs={1}></Grid>
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
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Box boxShadow={2} className={classes.statusCard}>
              <Grid container align="center" direction="column">
                <Grid item style={{ marginTop: "30px"}}>
                  <h2>${profile.rate}/hr</h2>
                </Grid>
                <Grid item>
                  <Rating value={5} readOnly className={"mb-1"} />
                </Grid>
                <Grid item className={classes.marginBottom}>
                  <TextField
                    id="drop-in"
                    label="Drop In"
                    name="startDate"
                    type="date"
                    onChange={this.handleInputChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item className={classes.marginBottom}>
                  <TextField
                    id="drop-out"
                    label="Drop Out"
                    name="endDate"
                    type="date"
                    onChange={this.handleInputChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item style={{marginTop: "30px", marginBottom: "30px"}}>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={this.sendRequest}
                    className={classes.requestBtn}
                  >
                    Send Request
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(detailsStyle)(ProfileDetails);
