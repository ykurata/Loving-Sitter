import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import PicturePage from "./pages/Picture";

import "./App.scss";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/profile" component={ProfilePage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
