import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";

const picturePageStyle = theme => ({
  pictureContainer: {
    margin: theme.spacing.unit * 2
  }
});

class PicturePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      file: null
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

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
      <div className={classes.pictureContainer}>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <img src={this.state.file} />
            </Grid>
            <Grid item xs={12}>
            <input type="file" name="pic" accept="image/*" onChange={this.handleChange} />
            </Grid>
            <Grid item xs={12}>
            <input type="submit" />
            </Grid>
          </Grid>
          <form>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(picturePageStyle)(PicturePage);
