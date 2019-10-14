import React, { Component } from "react";
// import NavigationBar from "./Navbar";
import Grid from "@material-ui/core/Grid";
import "../App.scss";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Avatar from "@material-ui/core/Avatar";
import NavigationBar from "./Navbar";

import { withStyles } from "@material-ui/core/styles";

import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import RoomIcon from "@material-ui/icons/Room";

import TextField from "@material-ui/core/TextField";

import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { red } from "@material-ui/core/colors";
// import { borderRadius } from "@material-ui/system";

const photoPageStyle = theme => ({
  bigAvatar: {
    width: 100,
    height: 100,
    margin: 10
  },

  cardDivider: {
    borderBottom: "2px solid lightgrey"
  },

  dateOutline: {
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "4px",
    height: "85%"
  }
});

class ProfileListPage extends Component {
  render() {
    // Note: Code below will be used for looping, will be used when calling from backend
    // var numbers = [...Array(7).keys()];
    const { classes } = this.props;
    return (
      <div>
        <NavigationBar></NavigationBar>
        <Grid container spacing={3}>
          <Grid item xs={12} className="center">
            <h1>Your search results</h1>
          </Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Grid container spacing={3}>
              <Grid item xs={3}></Grid>
              <Grid item xs={4} className="pr-0">
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="secondary" />
                      </InputAdornment>
                    )
                  }}
                  id="outlined-bare"
                  placeholder="Search Location"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={2} className="pl-0">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label=" "
                    format="MM/dd/yyyy"
                    className={classes.dateOutline}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={3}></Grid>

              {/* Looping code, will be used later on starts with this -> {
             numbers.map(el =>
              */}
              <Grid item xs={4} className="mt-1">
                <Card>
                  <CardActionArea className={classes.cardDivider}>
                    <Grid container spacing={3}>
                      <Grid item xs={4}></Grid>

                      <Grid item xs={4} className="center">
                        <Avatar
                          alt="Remy Sharp"
                          src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                          className={classes.bigAvatar}
                        />
                      </Grid>
                      <Grid item xs={4}></Grid>
                    </Grid>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className="mb-0 center"
                      >
                        Mc Barkly
                      </Typography>

                      <Typography
                        variant="body1"
                        color="textSecondary"
                        className="center"
                        component="p"
                      >
                        Loving Pet
                      </Typography>

                      <Grid container spacing={3}>
                        <Grid item xs={12} className="center">
                          <Box component="fieldset" borderColor="transparent">
                            <Rating value="5" readOnly />
                          </Box>
                        </Grid>
                      </Grid>

                      <Typography
                        variant="body1"
                        // variant="h5" component="h2"
                        className="center"
                        component="p"
                      >
                        <b>Lizards are wow, Wowzers</b>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Grid container spacing={3}>
                      <Grid item xs={1}>
                        <RoomIcon color="secondary" />
                      </Grid>
                      <Grid item xs={8}>
                        <p className="mt-0 mb-0">Location, ON </p>
                      </Grid>
                      <Grid item xs={2}>
                        <b>
                          {" "}
                          <p className="mt-0 mb-0">$200/hr </p>
                        </b>
                      </Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>

              {/* End of looping and will end with -> )}  */}

              <Grid item xs={4} className="center">
                <h1>2</h1>
              </Grid>
              <Grid item xs={4} className="center">
                <h1>3</h1>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(photoPageStyle)(ProfileListPage);
