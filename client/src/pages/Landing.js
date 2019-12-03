import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "../App.scss";

import NavigationBar from "./Navbar";

class Landing extends Component {
state = {
  location: "",
  dropIn: "",
  dropOff: ""
};

changeLocation = event => {
  console.log(event.target.value);
  this.setState({ location: event.target.value });
};

handleDropInChange = event => {
  console.log(event.target.value);
  this.setState({ dropIn: event.target.value });
};

handleDropOffChange = event => {
  console.log(event.target.value);
  this.setState({ dropOff: event.target.value });
};
  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavigationBar></NavigationBar>
        <div className="App">
          <div className="App_aside">
            <div className="info-box">
              <Grid container style={{ marginTop: "50px" }}>
                <Grid item xs={12}>
                  <h1>Find the care your dog deserves</h1>
                </Grid>

                <Grid item xs={12}>
                  <p className="mb-0">
                    <b>WHERE</b>
                  </p>
                </Grid>

                <Grid item xs={10}>
                  <TextField
                    id="outlined-bare"
                    placeholder="Anywhere"
                    margin="normal"
                    variant="outlined"
                    value={this.state.location}
                    onChange={this.changeLocation}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}></Grid>

                <Grid item xs={12}>
                  <p className="mb-0">
                    <b>DROP IN / DROP OFF</b>
                  </p>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="date"
                    name="birthDate"
                    id="standard-birthDate"
                    value={this.state.dropIn}
                    onChange={this.handleDropInChange}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="date"
                    name="birthDate"
                    id="standard-birthDate"
                    value={this.state.dropOff}
                    onChange={this.handleDropOffChange}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}></Grid>

                <Grid item xs={10}>
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    style={{ backgroundColor: "#f04040", color: "white", marginTop: "30px"}}
                  >
                    FIND MY DOG SITTER
                  </Button>
                </Grid>

                <Grid item xs={4}></Grid>
              </Grid>
            </div>
          </div>
          <div className="App_form"></div>
        </div>
      </div>
    );
  }
}

export default Landing;
