import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import PicturePage from "./pages/Picture";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/ping" component={LandingPage} />
        <Route path="/" component={PicturePage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
