import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";

import "./App.scss";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import EditProfilePage from "./pages/EditProfile";
import ProfilePayment from "./pages/ProfilePayment";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/profile" component={EditProfilePage} />
        <Route path="/profile-payment" component={ProfilePayment} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
