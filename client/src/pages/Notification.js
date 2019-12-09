import React, { Component } from 'react';
import axios from "axios";
import Moment from 'react-moment';

import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';


const NotificationStyle = theme => ({
  card: {
    maxWidth: 450,
    boxShadow: 'none',
  },
  image: {
    width: 70,
    height: 80,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  list: {
    maxHeight: 200,
    overflow: 'auto',
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

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
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
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { recievedRequests } = this.state;
    let notifications;

    if (recievedRequests.length) {
      notifications = recievedRequests.map((item, i) => (
        <MenuItem style={{backgroundColor: 'white'}} key={i}>
          <Card className={classes.card}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img  className={classes.img} alt="complex"  src={item.sender_info[0].photoUrl} />
                </ButtonBase>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography noWrap variant='subtitle1'>{item.sender_info[0].firstName} {item.sender_info[0].lastName} has requested your service</Typography>
                <Typography variant="caption" color="textSecondary">Dog Sitting</Typography>
                <Typography variant="subtitle1"><Moment format="MM/DD/YYYY">{item.startDate}</Moment> - <Moment format="MM/DD/YYYY">{item.endDate}</Moment></Typography>
              </Grid>
            </Grid>
            <Divider />
          </Card>
        </MenuItem>
          
      ));
    } else {
      notifications = null;
    }

    return (
      <div> 
        <span>
          <List className={classes.list}>
            {notifications}
          </List>   
        </span>
      </div>
    );
  }
};

export default withStyles(NotificationStyle)(Notification);