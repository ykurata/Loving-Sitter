import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";

import Notification from "./Notification";

class NotificationButton extends Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <span>
        <Button
          onClick={this.handleMenu}
        >
          Notification
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          onClose={this.handleClose}
        >
        <MenuItem style={{backgroundColor: 'white'}} >
          <Notification></Notification>
        </MenuItem>
        </Menu>
      </span>
    );
  }
}

export default NotificationButton;