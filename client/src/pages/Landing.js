import React, { Component } from "react";
import NavigationBar from "./Navbar";
import Grid from "@material-ui/core/Grid";

import "../App.scss";

class LandingPage extends Component {
  render() {
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
              </Grid>
            </div>
          </div>
          <div className="App_form"></div>
        </div>
       </div>
    );
  }
}

export default LandingPage;
