import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, Typography, List, ListItem,
  withStyles, Grid, SwipeableDrawer, Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import logo from '../images/loving-sitter-logo.png';

const styleSheet = {
  navbar: {
    backgroundColor: 'transparent',
    boxShadow: "none",
  },
  list : {
    width : 200,
  },
  padding : {
    paddingRight : 30,
    cursor : "pointer",
  },
  sideBarIcon : {
    padding : 0,
    color : "white",
    cursor : "pointer",
  },
  menuButton: {
    marginRight: 20
  },
}

class Navbar extends Component{
  constructor(props){
    super(props);
    this.state = {drawerActivate:false, drawer:false};
    this.createDrawer = this.createDrawer.bind(this);
    this.destroyDrawer = this.destroyDrawer.bind(this);
  }

  componentWillMount(){
    if(window.innerWidth <= 600){
      this.setState({drawerActivate:true});
    }

    window.addEventListener('resize',()=>{
      if(window.innerWidth <= 600){
        this.setState({drawerActivate:true});
      }
      else{
        this.setState({drawerActivate:false})
      }
    });
  }

  //Small Screens
  createDrawer(){
    const {classes} = this.props
    return (
      <div>
        <AppBar className={classes.navbar}>
          <Toolbar>
            <Grid container direction = "row" justify = "space-between" alignItems="center">
              <MenuIcon
                className = {this.props.classes.sideBarIcon}
                onClick={()=>{this.setState({drawer:true})}} />

              <Typography color="inherit" variant = "headline">
                <img src={logo} alt="logo"></img>
              </Typography>
              <Typography color="inherit" variant = "headline"></Typography>
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
         open={this.state.drawer}
         onClose={()=>{this.setState({drawer:false})}}
         onOpen={()=>{this.setState({drawer:true})}}>

           <div
             tabIndex={0}
             role="button"
             onClick={()=>{this.setState({drawer:false})}}
             onKeyDown={()=>{this.setState({drawer:false})}}>

            <List className = {this.props.classes.list}>
               <ListItem key = {1} button divider> Option 1 </ListItem>
               <ListItem key = {2} button divider> Option 2 </ListItem>
               <ListItem key = {3} button divider> Option 3 </ListItem>
             </List>

         </div>
       </SwipeableDrawer>

      </div>
    );
  }

  //Larger Screens
  destroyDrawer(){
    const {classes} = this.props
    return (
      <AppBar className={classes.navbar}>
        <Toolbar>
          <Typography variant = "headline" style={{flexGrow:1}} color="inherit" >
            <img src={logo} alt="logo"></img>
          </Typography>
          <Button
            className={classes.menuButton}
            color="inherit"
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
        </Toolbar>
      </AppBar>
    )
  }

  render(){
    return(
      <div>
        {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
      </div>
    );
  }
}

Navbar.propTypes = {
  classes : PropTypes.object.isRequired
};



export default withStyles(styleSheet)(Navbar);