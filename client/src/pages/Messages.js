import React, { Component } from "react";
import "../App.scss";
import NavigationBar from "./Navbar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

const messagesPageStyle = theme => ({
  // root: {
  //   width: "100%",
  //   maxWidth: 360,
  //   backgroundColor: theme.palette.background.paper
  // },

  list: {
    maxHeight: "81vh",
    overflow: "auto"

  },

  cardStyle: {
    height: "81vh"
  },

  bigAvatar: {
    width: 50,
    height: 50,
    marginBottom: "5px",
    marginTop: "5px",
    marginLeft: "10px"
  },

  title: {
    border: "0.5px solid #e6e6e6",
    textAlign: "center"
  },
  border: {
    border: "0.5px solid #e6e6e6",
    borderRight: "0px"
  },

  messagesArea: {
    height: "70vh",
    border: "1px solid red"
  },

  messagingArea: {
    // height: "11vh",
    border: "1px solid #e6e6e6"
  },

  textField: {
    width: "100%",
    paddingLeft: "10px"

  },

  input1: {
    height: "8vh"
  },

  buttonContainer: {
    height: "100%",
  },

  sendButton: {
    top: "30%",
    backgroundColor: "#f04040"
  }
});

class MessagesPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavigationBar></NavigationBar>
        <Grid container>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={12} className={classes.title}>
                <h3>Inbox Messages</h3>
              </Grid>
              <Grid item xs={12}>
                <Card className={classes.cardStyle}>
                  <List className={classes.list}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Mc Barkly"
                        secondary={
                          <React.Fragment>
                            I'll be in your neighborhood doing errands this…
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Mc Barkly"
                        secondary={
                          <React.Fragment>
                            I'll be in your neighborhood doing errands this…
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Mc Barkly"
                        secondary={
                          <React.Fragment>
                            I'll be in your neighborhood doing errands this…
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Mc Barkly"
                        secondary={
                          <React.Fragment>
                            I'll be in your neighborhood doing errands this…
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Mc Barkly"
                        secondary={
                          <React.Fragment>
                            I'll be in your neighborhood doing errands this…
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Mc Barkly"
                        secondary={
                          <React.Fragment>
                            I'll be in your neighborhood doing errands this…
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Mc Barkly"
                        secondary={
                          <React.Fragment>
                            I'll be in your neighborhood doing errands this…
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Mc Barkly"
                        secondary={
                          <React.Fragment>
                            I'll be in your neighborhood doing errands this…
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Mc Barkly"
                        secondary={
                          <React.Fragment>
                            I'll be in your neighborhood doing errands this…
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Mc Barkly"
                        secondary={
                          <React.Fragment>
                            I'll be in your neighborhood doing errands this…
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Mc Barkly"
                        secondary={
                          <React.Fragment>
                            I'll be in your neighborhood doing errands this…
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </List>
                </Card>
                
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Grid container className={classes.border}>
              <Grid item xs={1}>
                <Avatar
                  alt="Remy Sharp"
                  src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
                  className={classes.bigAvatar}
                />
              </Grid>
              <Grid item xs={11}>
                <h3>NAME</h3>
              </Grid>
            </Grid>
            <Grid container className={classes.messagesArea}>
              <Grid item xs={12}>
                <h1>Test</h1>
              </Grid>
            </Grid>

            <Grid container className={classes.messagingArea}>
              <Grid item xs={8}>
                <TextField
                  id="standard-bare"
                  className={classes.textField}
                  placeholder="Reply to Mc Barkly"
                  margin="normal"
                  // inputProps={{ "aria-label": "bare" }}
                  inputProps={{ "aria-label": "bare", className: classes.input1 }}
                />
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={2}>
                <div className={classes.buttonContainer}>
                <Button variant="contained" color="primary" fullWidth className={classes.sendButton}>
        Send
      </Button>
                </div>
              <Grid item xs={1}></Grid>

              
</Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(messagesPageStyle)(MessagesPage);
