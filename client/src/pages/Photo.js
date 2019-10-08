import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

import "../App.scss";

const photoPageStyle = theme => ({
  photoContainer: {
    margin: theme.spacing.unit * 2
  }
});

class PhotoPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      file: null
    }
    this.handlePhotoChange = this.handlePhotoChange.bind(this)
  }

  handlePhotoChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  componentDidMount() {
    fetch("/welcome")
      .then(res => {
        console.log(res);
        if (res.status === 200) return res.json();
        else throw Error("Couldn't connect to the server");
      })
      .then(res => {
        this.setState({ welcomeMessage: res.welcomeMessage });
        this.incrementStep();
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="pageArea">
        <div className="menuArea">
          <MenuList>
            <MenuItem component={Link} to="/">
              Edit Profile
            </MenuItem>
            <MenuItem component={Link} to="/profile-photo">
              Profile Photo
            </MenuItem>
            <MenuItem component={Link} to="/payment">
              Payment
            </MenuItem>
            <MenuItem component={Link} to="/security">
              Security
            </MenuItem>
            <MenuItem component={Link} to="/settings">
              Settings
            </MenuItem>
          </MenuList>
        </div>
        <div className="settingsArea">
          <div className={classes.photoContainer}>
            <div>
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <img src={this.state.file} />
                  </Grid>
                  <Grid item xs={12}>
                    <input type="file" name="pic" accept="image/*" onChange={this.handlePhotoChange} />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={this.handleSubmit}>
                    Submit
                    </Button>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(photoPageStyle)(PhotoPage);
