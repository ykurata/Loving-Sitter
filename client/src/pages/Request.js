import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { getRequests, deleteRequest } from "../actions/requestActions";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import Navbar from "../components/Navbar";

const RequestStyle = makeStyles((theme) => ({
  root: {
    marginTop: 100,
  },
  title: {
    paddingBottom: 20,
    fontSize: "7vmin",
  },
  card: {
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    backgroundColor: "#f8f6f6",
  },
  avatar: {
    width: 100,
    height: 100,
    margin: "10px",
    marginRight: "30px",
  },
}));

const Request = (props) => {
  const classes = RequestStyle();
  const token = localStorage.getItem("jwtToken");
  const sentRequests = useSelector((state) => state.request.requests);
  const dispatch = useDispatch();

  // Get all requests you sent
  useEffect(() => {
    dispatch(getRequests(token));
  }, []);

  // Remove a request
  const removeRequest = (item) => {
    dispatch(deleteRequest(item, token));
  };

  let requests;
  if (sentRequests.length > 0) {
    requests = sentRequests.map((item, i) => (
      <Grid item xs={12} align="center" className={classes.container} key={i}>
        <List className={classes.card}>
          <ListItem divider={true}>
            <ListItemAvatar
              className={classes.avatar}
              src={item.reciever_info[0].photoUrl}
            >
              <Avatar
                className={classes.avatar}
                alt="complex"
                src={item.reciever_info[0].photoUrl}
              />
            </ListItemAvatar>
            <ListItemText>
              <Grid item>
                <Typography variant="h5">
                  {item.reciever_info[0].firstName}{" "}
                  {item.reciever_info[0].lastName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" gutterBottom>
                  From: <Moment format="MMM Do YYYY">{item.startDate}</Moment> -{" "}
                  <Moment format="MMM Do YYYY">{item.endDate}</Moment>
                </Typography>
              </Grid>
              <Grid item>
                {item.accepted === true ? (
                  <p>Status: Accepted</p>
                ) : (
                  <p>Status: Pending</p>
                )}
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={(e) => {
                    if (
                      window.confirm(
                        "Are you sure you wish to delete this item?"
                      )
                    )
                      removeRequest(item);
                  }}
                >
                  Remove
                </Button>
                {item.accepted === true ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginLeft: "10px" }}
                    component={Link}
                    to={"/payment"}
                  >
                    Pay Now
                  </Button>
                ) : null}
              </Grid>
            </ListItemText>
            <ListItemText>
              <Grid item style={{ marginBottom: "80px" }}>
                <p>$ {item.reciever_info[0].rate}/hr</p>
              </Grid>
            </ListItemText>
          </ListItem>
        </List>
      </Grid>
    ));
  } else {
    requests = (
      <Grid item xs={12} align="center" className={classes.container}>
        <p>There is no sent requests</p>
      </Grid>
    );
  }

  return (
    <div>
      <Navbar />
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} align="center">
            <Typography className={classes.title} variant="h3">
              Your Sent Request
            </Typography>
          </Grid>
          {requests}
        </Grid>
      </div>
    </div>
  );
};

export default Request;
