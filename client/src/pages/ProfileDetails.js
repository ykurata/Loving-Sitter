import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import NavigationBar from "./Navbar";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Snackbar, IconButton } from "@material-ui/core";


const detailsStyle = theme => ({
  smallAvatar: {
    width: 75,
    height: 75
  },
  bigAvatar: {
    width: 300,
    height: 300
  },
  roundedBigAvatar: {
    width: 300,
    height: 300,
    borderRadius: 10
  },
  root: {
    flexGrow: 1
  },
  marginHorizontal: {
    marginLeft: 60,
    marginRight: 30
  },
  marginBottom: {
    marginBottom: 30
  },
  squareBackground: {
    borderRadius: 0,
    width: 300,
    height: 300
  },
  border: {
    border: 10
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
  },
  marginAuto: {
    margin: "auto"
  }
});

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Available",
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
        <NavigationBar></NavigationBar>
        <Grid container className={"pb-1"}>
          <Grid item xs={1}></Grid>
          <Grid item xs={11} className="pl-0">
            <Button component={Link} to={"../sitter-search"}>
              &lt; Back to list
            </Button>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={7}>
            <Grid container align="center">
              <Box width={1} boxShadow={2}>
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
                <Grid item className={classes.marginBottom}>
                  <Typography variant="p">{profile.address}</Typography>
                </Grid>
                <Grid
                  item
                  xs={11}
                  align="left"
                  className={classes.marginBottom}
                >
                  <Typography
                    className={classes.marginHorizontal}
                    variant="body1"
                  > 
                    <h2>About Me</h2>
                    {profile.description}
                  </Typography>
                </Grid>
                
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Box boxShadow={2} className={classes.statusCard}>
              <Grid container align="center" direction="column">
                {/*Add color based on status*/}
                <Box width={1}>
                  <h2>{this.state.status}</h2>
                </Box>
                <Grid item>
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
                <Grid item className={classes.marginBottom}>
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
