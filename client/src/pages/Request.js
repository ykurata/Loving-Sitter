import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Moment from 'react-moment';

import { withStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Navbar from "../components/Navbar";

const RequestStyle = theme => ({
  root: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    backgroundColor: '#f8f6f6'
  },
  avatar: {
    width: 100,
    height: 100,
    margin: "10px",
    marginRight: "30px"
  },
});


class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentRequests: [],
      token: localStorage.getItem("jwtToken"),
    };
  }

  componentDidMount() {
    this.getRequests();
  }

  // Get all requests you sent
  getRequests() {
    axios.get('/request/get-requests', { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        this.setState({
          sentRequests: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Remove a request 
  removeRequest(item) {
    axios.delete(`request/delete/${item._id}`, { headers: { Authorization: `Bearer ${this.state.token}` }})
    .then(res => {
      console.log("successfully deleted");
    })
      axios.get('/request/get-requests', { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        this.setState({
          sentRequests: res.data
        });
      })
      .catch(err => {
        console.log(err);
      })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    const { classes } = this.props;
    const { sentRequests } = this.state;
    let requests;
    if (sentRequests.length > 0) {
      requests = sentRequests.map((item, i) => (
        <Grid item xs={12} align='center' className={classes.container} key={i}>
          <List className={classes.root}>
            <ListItem  divider={true}>
              <ListItemAvatar className={classes.avatar} src={item.reciever_info[0].photoUrl}>
                <Avatar className={classes.avatar} alt="complex" src={item.reciever_info[0].photoUrl} />
              </ListItemAvatar>
              <ListItemText>
                <Grid item>
                  <Typography variant='h5'>{item.reciever_info[0].firstName} {item.reciever_info[0].lastName}</Typography>
                </Grid>
                <Grid item>
                <Typography variant="body2" gutterBottom>From: <Moment format="MMM Do YYYY">{item.startDate}</Moment> - <Moment format="MMM Do YYYY">{item.endDate}</Moment></Typography>
                </Grid>
                <Grid item>
                  {item.accepted === true ?
                    <p>Status: Accepted</p>
                  : <p>Status: Pending</p>
                  }
                </Grid>
                <Grid item>
                  <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.removeRequest(item) } }
                  >
                    Remove
                  </Button>
                  {item.accepted === true ?
                    <Button 
                    variant="outlined" 
                    color="primary"
                    style={{ marginLeft: "10px" }}
                    component={Link}
                    to={'/payment'}
                    >
                      Pay Now
                    </Button>
                  : null  
                  }
                </Grid>
              </ListItemText>
              <ListItemText>
                <Grid item style={{marginBottom: "80px"}}>
                  <p>$ {item.reciever_info[0].rate}/hr</p>
                </Grid>
              </ListItemText>
            </ListItem>        
          </List>
        </Grid>
      ))
    } else {
      requests = <Grid item xs={12} align='center' className={classes.container}>
                    <p>There is no sent requests</p>
                  </Grid>
    }

    return (
      <div>
        <Navbar/>
        <div>
          <Grid container>
            <Grid item xs={12} align='center'>
              <h1>Your Sent Request</h1>
            </Grid>
            {requests}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(RequestStyle)(Request);