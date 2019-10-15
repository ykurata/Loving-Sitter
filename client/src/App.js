import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import PhotoPage from "./pages/Photo";

import "./App.scss";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import EditProfilePage from "./pages/EditProfile";
import ProfilePayment from "./pages/ProfilePayment";
import ProfileDetails from "./pages/ProfileDetails";
import PrivateRoute from "./pages/PrivateRoute";

import { subscribeToTimer } from "./pages/Landing";

class App extends Component {
  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp 
    }));
  }

  state = {
    timestamp: 'no timestamp yet'
  };

  render() {
    return (
      <div className="App">
        <p className="App-intro">
        This is the timer value: {this.state.timestamp}
        </p>
      </div>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <PrivateRoute path='/profile' component={EditProfilePage} />
          <Route path="/profile-payment" component={ProfilePayment} />
          <Route path="/profile-photo" component={PhotoPage} />
          <Route path="/profile-details" component={ProfileDetails} />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
  
}

export default App;
