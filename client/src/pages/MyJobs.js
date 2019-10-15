import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import NavigationBar from "./Navbar";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";

import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const photoPageStyle = theme => ({
  bigAvatar: {
    width: 100,
    height: 100,
    margin: "10px"
  },
  contactBtn: {
    backgroundColor: "orange",
    color: "#fff"
  },

  payBtn: {
    backgroundColor: "green",
    color: "#fff"
  }
});

class MyJobsPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavigationBar></NavigationBar>
        <Grid container>
          <Grid item xs={12} className="center">
            <h1>My Job Requests</h1>
          </Grid>
          <Grid item xs={12} className="center">
            <h2>Sent Job Requests</h2>
          </Grid>

          <Grid item xs={2}></Grid>

          <Grid item xs={8}>
            <Card>
              <div>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={2}
                    container
                    spacing={0}
                    align="center"
                    justify="center"
                    direction="column"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                      className={classes.bigAvatar}
                    />
                  </Grid>

                  <Grid item xs={10}>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <CardContent className="pb-0">
                          <Typography component="h5" variant="h5">
                            Mc Barkly
                          </Typography>
                        </CardContent>
                      </Grid>
                      <Grid item xs={3}>
                        <Box
                          component="fieldset"
                          borderColor="transparent"
                          className="mt-1 pt-0"
                        >
                          <Rating value={5} readOnly />
                        </Box>
                      </Grid>

                      <Grid item xs={3}>
                        <CardContent className="pb-0">
                          <Typography component="h5" variant="h5">
                            $200/hr
                          </Typography>
                        </CardContent>
                      </Grid>

                      <Grid item xs={3}>
                        <CardContent className="pb-0">
                          <Typography component="h5" variant="h5">
                            Status: Pending
                          </Typography>
                        </CardContent>
                      </Grid>

                      <Grid item xs={12} className="pt-0">
                        <CardContent className="pt-0">
                          <Typography component="h5" variant="h5">
                            Location: 1600 Amphitheatre Pkwy, Mountain View, CA
                            94043, United States
                          </Typography>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Card>
          </Grid>
          <Grid item xs={2}></Grid>

          <Grid item xs={12} className="center">
            <h2>Recieved Job Requests</h2>
          </Grid>

          {/* Loop code will start from here */}
          <Grid item xs={2}></Grid>

          <Grid item xs={8}>
            <Card className="mt-1 mb-1">
              <div>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={2}
                    container
                    spacing={0}
                    align="center"
                    justify="center"
                    direction="column"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={require("../images/1a350ede83e5c0c4b87586c0d4bad0f66b86da37.png")}
                      className={classes.bigAvatar}
                    />
                  </Grid>

                  <Grid item xs={10}>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <CardContent className="pb-0">
                          <Typography component="h5" variant="h5">
                            FName LName
                          </Typography>
                        </CardContent>
                      </Grid>
                      <Grid item xs={3}>
                        <Box
                          component="fieldset"
                          borderColor="transparent"
                          className="mt-1 pt-0"
                        >
                          <Rating value={5} readOnly />
                        </Box>
                      </Grid>

                      <Grid item xs={3}>
                        <CardContent className="pb-0">
                          <Typography component="h5" variant="h5">
                            $900/hr
                          </Typography>
                        </CardContent>
                      </Grid>

                      <Grid item xs={3}>
                        <CardContent className="pb-0">
                          <Typography component="h5" variant="h5">
                            Status: Pending
                          </Typography>
                        </CardContent>
                      </Grid>

                      <Grid item xs={5} className="pt-0">
                        <CardContent className="pt-0">
                          <Typography component="h5" variant="h5">
                            Date: 1/1/2018 To 1/1/2019
                          </Typography>
                        </CardContent>
                      </Grid>
                      <Grid item xs={1} className="pt-0"></Grid>
                      <Grid item xs={3} className="pt-0">
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          size="large"
                        >
                          Accept
                        </Button>
                      </Grid>

                      <Grid item xs={3} className="pt-0 pr-2">
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          size="large"
                        >
                          Decline
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Card>
          </Grid>
          <Grid item xs={2}></Grid>
          {/* Loop code will end here. All code underneath is unnecessary and is only used for templating and testing */}

          {/* Contact User button view */}

          <Grid item xs={2}></Grid>

          <Grid item xs={8}>
            <Card className="mt-1">
              <div>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={2}
                    container
                    spacing={0}
                    align="center"
                    justify="center"
                    direction="column"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={require("../images/1a350ede83e5c0c4b87586c0d4bad0f66b86da37.png")}
                      className={classes.bigAvatar}
                    />
                  </Grid>

                  <Grid item xs={10}>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <CardContent className="pb-0">
                          <Typography component="h5" variant="h5">
                            FName LName
                          </Typography>
                        </CardContent>
                      </Grid>
                      <Grid item xs={3}>
                        <Box
                          component="fieldset"
                          borderColor="transparent"
                          className="mt-1 pt-0"
                        >
                          <Rating value={5} readOnly />
                        </Box>
                      </Grid>

                      <Grid item xs={3}>
                        <CardContent className="pb-0">
                          <Typography component="h5" variant="h5">
                            $900/hr
                          </Typography>
                        </CardContent>
                      </Grid>

                      <Grid item xs={3}>
                        <CardContent className="pb-0">
                          <Typography component="h5" variant="h5">
                            Status: Pending
                          </Typography>
                        </CardContent>
                      </Grid>

                      <Grid item xs={5} className="pt-0">
                        <CardContent className="pt-0">
                          <Typography component="h5" variant="h5">
                            Date: 1/1/2018 To 1/1/2019
                          </Typography>
                        </CardContent>
                      </Grid>
                      <Grid item xs={1} className="pt-0"></Grid>
                      <Grid item xs={3} className="pt-0"></Grid>

                      <Grid item xs={3} className="pt-0 pr-2">
                        <Button
                          variant="contained"
                          className={classes.contactBtn}
                          fullWidth
                          size="large"
                        >
                          Contact User
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Card>
          </Grid>
          <Grid item xs={2}></Grid>

          {/* Pay user button view */}
          <Grid item xs={2}></Grid>

          <Grid item xs={8}>
            <Card className={"mt-1 mb-1"}>
              <div>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={2}
                    container
                    spacing={0}
                    align="center"
                    justify="center"
                    direction="column"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={require("../images/1a350ede83e5c0c4b87586c0d4bad0f66b86da37.png")}
                      className={classes.bigAvatar}
                    />
                  </Grid>

                  <Grid item xs={10}>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <CardContent className="pb-0">
                          <Typography component="h5" variant="h5">
                            FName LName
                          </Typography>
                        </CardContent>
                      </Grid>
                      <Grid item xs={3}>
                        <Box
                          component="fieldset"
                          borderColor="transparent"
                          className="mt-1 pt-0"
                        >
                          <Rating value={5} readOnly />
                        </Box>
                      </Grid>

                      <Grid item xs={3}>
                        <CardContent className="pb-0">
                          <Typography component="h5" variant="h5">
                            $900/hr
                          </Typography>
                        </CardContent>
                      </Grid>

                      <Grid item xs={3}>
                        <CardContent className="pb-0">
                          <Typography component="h5" variant="h5">
                            Status: Pending
                          </Typography>
                        </CardContent>
                      </Grid>

                      <Grid item xs={5} className="pt-0">
                        <CardContent className="pt-0">
                          <Typography component="h5" variant="h5">
                            Date: 1/1/2018 To 1/1/2019
                          </Typography>
                        </CardContent>
                      </Grid>
                      <Grid item xs={1} className="pt-0"></Grid>
                      <Grid item xs={3} className="pt-0"></Grid>

                      <Grid item xs={3} className="pt-0 pr-2">
                        <Button
                          variant="contained"
                          className={classes.payBtn}
                          fullWidth
                          size="large"
                        >
                          Pay Now
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Card>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(photoPageStyle)(MyJobsPage);
