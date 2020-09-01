import React from "react";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import { BrowserRouter, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";

// Import components
import Landing from "./pages/Landing";
import Photo from "./pages/Photo";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ProfileList from "./pages/ProfileList";
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";
import Payment from "./pages/Payment";
import MyJobs from "./pages/MyJobs";
import Request from "./pages/Request";
import ProfileDetails from "./pages/ProfileDetails";
import Messages from "./pages/Messages";
import PrivateRoute from "./components/PrivateRoute";

import store from "./store";

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <PrivateRoute path="/profile" component={EditProfile} />{" "}
          <PrivateRoute
            path="/profile-details/:id"
            component={ProfileDetails}
          />
          <PrivateRoute path="/my-profile/:id" component={MyProfile} />{" "}
          <PrivateRoute path="/sitter-search" component={ProfileList} />{" "}
          <PrivateRoute path="/messages" component={Messages} />{" "}
          <PrivateRoute path="/payment" component={Payment} />{" "}
          <PrivateRoute path="/profile-photo" component={Photo} />{" "}
          <PrivateRoute path="/my-jobs" component={MyJobs} />{" "}
          <PrivateRoute path="/request" component={Request} />{" "}
          <Route exact path="/" component={Landing} />{" "}
          <Route path="/login" component={Login} />{" "}
          <Route path="/signup" component={SignUp} />{" "}
        </BrowserRouter>{" "}
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
