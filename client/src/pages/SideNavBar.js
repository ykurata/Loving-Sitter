import React from "react";
import MenuList from "@material-ui/core/MenuList";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';

export default function SideNavigationBar() {
  var pageURL = window.location.href;
  var lastURLSegment = pageURL.substr(pageURL.lastIndexOf("/") + 1);

  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },

    selectedMenu: {
      color: "black"
    },

    notSelectedMenu: {
      color: "#979797"
    }
  }));
  const classes = useStyles();

  
  return (
    <MenuList>
      <MenuItem
        component={Link}
        to="/profile"
        selected={"profile" === lastURLSegment}
        className={ lastURLSegment === "profile" ? classes.selectedMenu : classes.notSelectedMenu}
      >
        Edit Profile
      </MenuItem>
      <MenuItem
        component={Link}
        to="/profile-photo"
        selected={"profile-photo" === lastURLSegment}
        className={ lastURLSegment === "profile-photo" ? classes.selectedMenu : classes.notSelectedMenu}
      >
        Profile Photo
      </MenuItem>
      <MenuItem
        component={Link}
        to="/payment"
        selected={"payment" === lastURLSegment}
        className={ lastURLSegment === "payment" ? classes.selectedMenu : classes.notSelectedMenu}
      >
        Payment
      </MenuItem>
    </MenuList>
  );
}
