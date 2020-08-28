import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  List,
  ListItem,
  withStyles,
  Grid,
  SwipeableDrawer,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../images/loving-sitter-logo.png";

const styleSheet = {
  navbar: {
    backgroundColor: "white",
    boxShadow: "none",
  },
  list: {
    width: 200,
  },
  listItem: {
    height: 50,
    textTransform: "uppercase",
  },
  padding: {
    paddingRight: 30,
    cursor: "pointer",
  },
  sideBarIcon: {
    padding: 0,
    color: "black",
    cursor: "pointer",
  },
  menuButton: {
    marginRight: 20,
  },
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerActivate: false,
      drawer: false,
      anchorEl: null,
      setAnchorEl: null,
      token: localStorage.getItem("jwtToken"),
      userId: localStorage.getItem("userId"),
      profile: {},
    };
    this.createDrawer = this.createDrawer.bind(this);
    this.destroyDrawer = this.destroyDrawer.bind(this);
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };

  componentWillMount() {
    if (window.innerWidth <= 800) {
      this.setState({ drawerActivate: true });
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 800) {
        this.setState({ drawerActivate: true });
      } else {
        this.setState({ drawerActivate: false });
      }
    });
  }

  componentDidMount() {
    axios
      .get(`/profile/get/${this.state.userId}`, {
        headers: { Authorization: `Bearer ${this.state.token}` },
      })
      .then((res) => {
        this.setState({
          profile: res.data.profile,
        });
      })
      .catch((err) => {
        console.log("Error fetching and parsing data", err);
      });
  }

  //Small Screens
  createDrawer() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar className={classes.navbar}>
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <MenuIcon
                className={this.props.classes.sideBarIcon}
                onClick={() => {
                  this.setState({ drawer: true });
                }}
              />

              <Typography color="inherit" component={Link} to="/">
                <img src={logo} alt="logo"></img>
              </Typography>
              <Typography color="inherit"></Typography>
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          open={this.state.drawer}
          onClose={() => {
            this.setState({ drawer: false });
          }}
          onOpen={() => {
            this.setState({ drawer: true });
          }}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              this.setState({ drawer: false });
            }}
            onKeyDown={() => {
              this.setState({ drawer: false });
            }}
          >
            {this.state.token ? (
              <List className={classes.list}>
                <ListItem
                  className={classes.listItem}
                  button
                  component={Link}
                  to={"/login"}
                >
                  Become a Sitter
                </ListItem>
                <ListItem
                  className={classes.listItem}
                  button
                  component={Link}
                  to={"/sitter-search"}
                >
                  Find Sitters
                </ListItem>
                <ListItem className={classes.listItem} button>
                  Messages
                </ListItem>
                <ListItem
                  className={classes.listItem}
                  button
                  component={Link}
                  to="/messages"
                ></ListItem>
                <ListItem
                  className={classes.listItem}
                  button
                  component={Link}
                  to={`/my-profile/${this.state.userId}`}
                >
                  My Profile
                </ListItem>
                <ListItem
                  className={classes.listItem}
                  button
                  component={Link}
                  to="/my-jobs"
                >
                  My Jobs
                </ListItem>
                <ListItem
                  className={classes.listItem}
                  button
                  component={Link}
                  to="/request"
                >
                  Requests
                </ListItem>
                <ListItem
                  className={classes.listItem}
                  button
                  onClick={this.handleLogout}
                >
                  Log Out
                </ListItem>
              </List>
            ) : (
              <List className={this.props.classes.list}>
                <ListItem className={classes.listItem} button>
                  Find Sitters
                </ListItem>
                <ListItem
                  className={classes.listItem}
                  button
                  component={Link}
                  to={"/login"}
                >
                  Log In
                </ListItem>
                <ListItem
                  className={classes.listItem}
                  button
                  component={Link}
                  to={"/signup"}
                >
                  Sign Up
                </ListItem>
              </List>
            )}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }

  //Larger Screens
  destroyDrawer() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar className={classes.navbar}>
        <Toolbar>
          <Typography
            style={{ flexGrow: 1 }}
            color="inherit"
            component={Link}
            to="/"
          >
            <img src={logo} alt="logo"></img>
          </Typography>
          {this.state.token ? (
            <span>
              <Button component={Link} to={"/sitter-search"}>
                Find Sitters
              </Button>
              <Button component={Link} to={"/profile"}>
                BECOME A SITTER
              </Button>
              <Button>Notifications</Button>
              <Button component={Link} to={"/messages"}>
                Messages
              </Button>
              <IconButton aria-label="avatar" onClick={this.handleClick}>
                {this.state.profile === null ? (
                  <Avatar src="" alt="Remy Sharp" className={classes.avatar} />
                ) : (
                  <Avatar
                    alt="Remy Sharp"
                    src={this.state.profile.photoUrl}
                    className={classes.avatar}
                  />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem
                  component={Link}
                  to={`/my-profile/${this.state.userId}`}
                >
                  My Profile
                </MenuItem>
                <MenuItem component={Link} to={"/my-jobs"}>
                  My Jobs
                </MenuItem>
                <MenuItem component={Link} to={"/request"}>
                  Requests
                </MenuItem>
                <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
              </Menu>
            </span>
          ) : (
            <span>
              <Button
                className={classes.menuButton}
                component={Link}
                to={"/profile"}
              >
                BECOME A SITTER
              </Button>
              <Button
                className={classes.menuButton}
                variant="outlined"
                color="secondary"
                component={Link}
                to={"/login"}
              >
                Log In
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to={"/signup"}
              >
                Sign Up
              </Button>
            </span>
          )}
        </Toolbar>
      </AppBar>
    );
  }

  render() {
    return (
      <div>
        {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Navbar);
