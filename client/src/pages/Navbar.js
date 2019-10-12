import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function NavigationBar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img src={require("../images/loving-sitter-logo.png")} alt="logo of app"/>
          </Typography>
          <Button color="inherit">BECOME A SITTER</Button>
          <Button color="inherit">My Sitters</Button>
          <Button color="inherit">Messages</Button>

          <IconButton aria-label="avatar" onClick={handleClick}>
          <Avatar alt="Remy Sharp" src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")} className={classes.bigAvatar}/>

      </IconButton>

     

      <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><a href="./profile">Profile</a></MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
        
        </Toolbar>
      </AppBar>
    </div>
  );
}
