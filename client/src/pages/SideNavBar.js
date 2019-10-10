import React from "react";
import MenuList from "@material-ui/core/MenuList";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";

export default function SideNavigationBar() {
  var pageURL = window.location.href;
  var lastURLSegment = pageURL.substr(pageURL.lastIndexOf("/") + 1);
  console.log(lastURLSegment);
  return (
    <MenuList>
      <MenuItem
        component={Link}
        to="/profile"
        selected={"profile" === lastURLSegment}
      >
        Edit Profile
      </MenuItem>
      <MenuItem
        component={Link}
        to="/profile-photo"
        selected={"profile-photo" === lastURLSegment}
      >
        Profile Photo
      </MenuItem>
      <MenuItem
        component={Link}
        to="/profile-payment"
        selected={"payment" === lastURLSegment}
      >
        Payment
      </MenuItem>
      <MenuItem
        component={Link}
        to="/security"
        selected={"security" === lastURLSegment}
      >
        Security
      </MenuItem>
      <MenuItem
        component={Link}
        to="/settings"
        selected={"settings" === lastURLSegment}
      >
        Settings
      </MenuItem>
    </MenuList>
  );
}
