import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import "./App.scss";

// Import components
import Landing from "./pages/Landing";
import Photo from "./pages/Photo";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ProfileList from "./pages/ProfileList";
import EditProfile from "./pages/EditProfile";
import ProfilePayment from "./pages/ProfilePayment";
import MyJobs from "./pages/MyJobs";
import Request from "./pages/Request";
import ProfileDetails from "./pages/ProfileDetails";
import PrivateRoute from "./pages/PrivateRoute";
import Messages from "./pages/Messages";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <PrivateRoute path='/profile' component={EditProfile} />
        <PrivateRoute path="/profile-details/:id" component={ProfileDetails} />
        <PrivateRoute path="/sitter-search" component={ProfileList} />
        <PrivateRoute path="/messages" component={Messages} />
        <PrivateRoute path="/profile-payment" component={ProfilePayment} />
        <PrivateRoute path="/profile-photo" component={Photo} />
        <PrivateRoute path="/my-jobs" component={MyJobs} />
        <PrivateRoute path="/request" component={Request} />
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
