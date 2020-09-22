import React from "react";
import { Link } from "react-router-dom";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectedMenu: {
    color: "black",
  },
  notSelectedMenu: {
    color: "#979797",
  },
}));

export default function SideNavigationBar() {
  let pageURL = window.location.href;
  let lastURLSegment = pageURL.substr(pageURL.lastIndexOf("/") + 1);
  const classes = useStyles();

  return (
    <MenuList>
      <MenuItem
        component={Link}
        to="/profile"
        selected={"profile" === lastURLSegment}
        className={
          lastURLSegment === "profile"
            ? classes.selectedMenu
            : classes.notSelectedMenu
        }
      >
        Edit Profile
      </MenuItem>
      <MenuItem
        component={Link}
        to="/profile-photo"
        selected={"profile-photo" === lastURLSegment}
        className={
          lastURLSegment === "profile-photo"
            ? classes.selectedMenu
            : classes.notSelectedMenu
        }
      >
        Profile Photo
      </MenuItem>
      <MenuItem
        component={Link}
        to="/payment"
        selected={"payment" === lastURLSegment}
        className={
          lastURLSegment === "payment"
            ? classes.selectedMenu
            : classes.notSelectedMenu
        }
      >
        Make Payment
      </MenuItem>
    </MenuList>
  );
}
