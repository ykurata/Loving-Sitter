import React, { Component } from "react";
import { Link } from 'react-router-dom';

import Grid from "@material-ui/core/Grid";

import "../App.scss";

class LandingPage extends Component {
  handleLogout = e => {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push('/');
  }

  render() {
    const token = localStorage.getItem('jwtToken');
    const username = localStorage.getItem('name');

    return (
      <div className="App">
        <div className="App_aside">
          <div className="info-box">
            <Grid container>
             
              <Grid item xs={12}>
                <h1>Find the care your dog deserves</h1>
              </Grid>

              {
                (token && username)
                  ? <div>
                      <h1>Logged in, { username }</h1>
                      <Link to="/" onClick={this.handleLogout} >Log Out</Link>;
                    </div>
                  : <Link to="/login" >Log In</Link>
              }
             
            </Grid>
          </div>
        </div>
        <div className="App_form"></div>
      </div>
    );
  }
}

export default LandingPage;
