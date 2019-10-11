import React, { Component } from "react";
// import NavigationBar from "./Navbar";
import Grid from "@material-ui/core/Grid";
import "../App.scss";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Avatar from '@material-ui/core/Avatar';
import NavigationBar from "./Navbar";

import { withStyles } from "@material-ui/core/styles";

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import RoomIcon from '@material-ui/icons/Room';

const photoPageStyle = theme => ({
 
  bigAvatar: {
    width: 100,
    height: 100,
    margin: 10,
  },

  cardDivider: {
    borderBottom: "2px solid lightgrey"
  },

  cardBorder: {
    boxShadow: "0px 0px 10px 10px lightgrey"
  },
});


class ProfileListPage extends Component {
  render() {
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
              <Grid item xs={4}>
                <Card className={classes.cardBorder}>
                  <CardActionArea className={classes.cardDivider}>
                    <Grid container spacing={3}>
              <Grid item xs={4}></Grid>
                      
              <Grid item xs={4} className="center">
                    <Avatar alt="Remy Sharp" src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")} className={classes.bigAvatar}/>
                    </Grid>
              <Grid item xs={4}></Grid>
                    </Grid>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2" className="mb-0 center">
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
                  <Grid container spacing={3} boxShadow={4}>  
              <Grid item xs={1}>
              <RoomIcon color="primary" />
              </Grid>
              <Grid item xs={8}>
              <p className="mt-0 mb-0">Location, ON </p>
                </Grid>
                <Grid item xs={2}>
               <b> <p className="mt-0 mb-0">$200/hr </p></b>
                </Grid>
                <Grid item xs={1}></Grid>

                </Grid>
                  </CardActions>
                </Card>
              </Grid>
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
