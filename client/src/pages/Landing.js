import React, { Component } from "react";
import NavigationBar from "./Navbar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import "../App.scss";
const landingPageStyle = theme => ({
  sendButton: {
    top: "100%",
    backgroundColor: "#f04040"
  }
});

class LandingPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavigationBar></NavigationBar>
        <div className="App">
          <div className="App_aside">
            <div className="info-box">
              <Grid container>
                <Grid item xs={12}>
                  <h1>Find the care your dog deserves</h1>
                </Grid>

                <Grid item xs={12}>
                  <p className="mb-0">
                    <b>WHERE</b>
                  </p>
                </Grid>

                <Grid item xs={8}>
                  <TextField
                    id="outlined-bare"
                    placeholder="Anywhere"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}></Grid>

                <Grid item xs={12}>
                  <p className="mb-0">
                    <b>DROP IN / DROP OFF</b>
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="date"
                    name="birthDate"
                    id="standard-birthDate"
                    // value={this.state.user.birthDate}
                    // onChange={this.handleInputChange}
                    margin="normal"
                    variant="outlined"
                    // disabled={this.state.disabled}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="date"
                    name="birthDate"
                    id="standard-birthDate"
                    // value={this.state.user.birthDate}
                    // onChange={this.handleInputChange}
                    margin="normal"
                    variant="outlined"
                    // disabled={this.state.disabled}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}></Grid>

                <Grid item xs={8}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    className={classes.sendButton}
                    // onClick={this.createMessage}
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

export default withStyles(landingPageStyle)(LandingPage);
