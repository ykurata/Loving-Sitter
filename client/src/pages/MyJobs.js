import React, { Component } from "react";
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

import NavigationBar from "./Navbar";

const MyJobsStyle = theme => ({
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
  button: {
    marginRight: "20px"
  }
});


class MyJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recievedRequests: [],
      token: localStorage.getItem("jwtToken"),
    };
  }

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

  // Remove a request 
  removeRequest(item) {
    axios.delete(`request/delete/${item._id}`, { headers: { Authorization: `Bearer ${this.state.token}` }})
    .then(res => {
      console.log("successfully deleted");
    })
      axios.get('/request/get-requested', { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        this.setState({
          recievedRequests: res.data
        });
      })
      .catch(err => {
        console.log(err);
      })
    .catch(err => {
      console.log(err);
    });
  }

  updateRequest(item) {
    const request = {
      senderId: item.senderId,
      recieverId: item.recieverId,
      startDate: item.startDate,
      endDate: item.endDate,
      accepted: true
    }
    axios.put(`request/update/${item._id}`, request, { headers: { Authorization: `Bearer ${this.state.token}` }})
    .then(res => {
      return  axios.get('/request/get-requested', { headers: { Authorization: `Bearer ${this.state.token}` }})
                .then(res => {
                  this.setState({
                    recievedRequests: res.data
                  });
                })
                .catch(err => {
                  console.log(err);
                })
              })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    const { classes } = this.props;
    const { recievedRequests } = this.state;
    let requests;
    if (recievedRequests.length > 0) {
      requests = recievedRequests.map((item, i) => (
        <Grid item xs={12} align='center' className={classes.container} key={i}>
          <List className={classes.root}>
            <ListItem  divider={true}>
              <ListItemAvatar className={classes.avatar} src={item.sender_info[0].photoUrl}>
                <Avatar className={classes.avatar} alt="complex" src={item.sender_info[0].photoUrl} />
              </ListItemAvatar>
              <ListItemText>
                <Grid item>
                  <Typography variant='h5'>{item.sender_info[0].firstName} {item.sender_info[0].lastName}</Typography>
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
                
                  {item.accepted === true ?
                    <Grid container>
                      <Grid item className={classes.button}>
                        <Button variant="outlined" color="primary" >
                          Contact User
                        </Button>
                      </Grid>  
                    </Grid>  
                  : <Grid container>
                      <Grid item className={classes.button}>
                        <Button 
                          variant="outlined" 
                          color="secondary" 
                          onClick={(e) => { if (window.confirm('Are you sure you want to accept this request?')) this.updateRequest(item) } }
                        >
                          Accept
                        </Button>
                      </Grid>  
                      <Grid item className={classes.button}>
                        <Button variant="outlined" color="primary" >
                          Contact User
                        </Button>
                      </Grid> 
                      <Grid item>
                        <Button 
                          variant="outlined"
                          className={classes.button}
                          onClick={(e) => { if (window.confirm('Are you sure you wish to decline this request?')) this.removeRequest(item) } }
                        >
                          Decline
                        </Button>
                      </Grid>
                    </Grid>  
                  }
              </ListItemText>
              <ListItemText>
                <Grid item style={{marginBottom: "80px"}}>
                  <p>$ {item.sender_info[0].rate}/hr</p>
                </Grid>
              </ListItemText>
            </ListItem>        
          </List>
        </Grid>
      ))
    } else {
      requests = <Grid item xs={12} align='center' className={classes.container}>
                    <p>There is no requests</p>
                  </Grid>
    }

    return (
      <div>
        <NavigationBar></NavigationBar>
        
          <Grid container>
            <Grid item xs={12} align='center'>
              <h1>My Jobs</h1>
            </Grid>
            {requests}
          </Grid>
      
      </div>
    );
  }
}

export default withStyles(MyJobsStyle)(MyJobs);