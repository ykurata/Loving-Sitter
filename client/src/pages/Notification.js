import React, { Component } from 'react';
import axios from "axios";
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';


const NotificationStyle = theme => ({
  list: {
    maxHeight: 200,
    overflow: 'auto'
  },
  card: {
    maxWidth: 450,
    boxShadow: 'none'
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
      anchorEl: null
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

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { recievedRequests } = this.state;
    const filteredRequests = recievedRequests.filter((request) => {
      return request.accepted === false;
    });
    let notifications;

    if (filteredRequests.length > 0) {
      notifications = filteredRequests.map((item, i) => (
        <MenuItem style={{backgroundColor: 'white'}} key={i} component={Link} to={"/my-jobs"} >
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
      <span>
        {filteredRequests.length > 0 ?
          <Badge color="secondary" variant="dot">
            <Button onClick={this.handleMenu} style={{padding:"0"}}>
              Notifications
            </Button>
          </Badge>
        : <Button onClick={this.handleMenu} style={{padding:"0"}}>
            Notifications
          </Button>
        }
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <List className={classes.list}>
            {notifications}
          </List>
        </Menu>
      </span>
    );
  }
};

export default withStyles(NotificationStyle)(Notification);