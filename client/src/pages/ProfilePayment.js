import React, { Component } from "react";

import SideNavigationBar from "./SideNavBar";
import NavigationBar from "./Navbar";

class ProfilePayment extends Component {
  render() {
    return (
      <div>
        <NavigationBar></NavigationBar>
        <div className="pageArea">
          <div className="infoArea">
            <div className="menuArea">
              <SideNavigationBar></SideNavigationBar>
            </div>
            <div className="settingsArea">
              <h1>test</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePayment;
