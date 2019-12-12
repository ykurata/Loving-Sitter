import React, { Component } from 'react';
import axios from "axios";
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';


const NotificationStyle = theme => ({
  card: {
    maxWidth: 450,
    boxShadow: 'none',
    maxHeight: 200,
  },
  avatar: {
    width: 50,
    height: 50,
    margin: "2px",
  }
});


class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recievedRequests: [],
      token: localStorage.getItem("jwtToken"),
    }
  };

  componentDidMount() {
    this.getRequests();
  }

  // Get all requests you sent
  getRequests() {
    axios.get('/request/get-requested', { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        this.setState({
          recievedRequests: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { recievedRequests } = this.state;
    const filteredRequests = recievedRequests.filter((request) => {
      return request.accepted === false;
    });
    let notifications;

    if (filteredRequests.length > 0) {
      notifications = filteredRequests.map((item, i) => (
        <MenuItem style={{backgroundColor: 'white'}} key={i} component={Link} to={`/profile-details/${item.sender_info[0].userId}`} >
          <Card className={classes.card}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar className={classes.avatar} src={item.sender_info[0].photoUrl} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography noWrap variant='subtitle1'>{item.sender_info[0].firstName} {item.sender_info[0].lastName} has requested your service</Typography>
                <Typography variant="caption" color="textSecondary">Dog Sitting</Typography>
                <Typography variant="subtitle1"><Moment format="MMM Do YYYY">{item.startDate}</Moment> - <Moment format="MMM Do YYYY">{item.endDate}</Moment></Typography>
              </Grid>
            </Grid>
            <Divider />
          </Card>
        </MenuItem>
      ));
    } else {
      notifications = <MenuItem style={{backgroundColor: 'white'}}>
                        <Card className={classes.card}>
                          <Grid container wrap="nowrap" spacing={2}>
                            <Grid item xs zeroMinWidth>
                              <Typography noWrap variant='subtitle1'>No notifications</Typography>
                            </Grid>
                          </Grid>
                        </Card>
                      </MenuItem>
    }

    return (
      <Grid>
        {notifications}
      </Grid>
    );
  }
};

export default withStyles(NotificationStyle)(Notification);