import React, { Component } from "react";
import axios from "axios";
import Moment from 'react-moment';

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import RoomIcon from "@material-ui/icons/Room";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import NavigationBar from "./Navbar";

const MyJobsStyle = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: "50px"
  },
  bigAvatar: {
    width: 100,
    height: 100,
    margin: "10px"
  },
  location: {
    marginTop: "10px"
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 600,
    marginTop: "20px"
  },  
  button: {
    marginLeft: "10px",
    marginBottom: "10px"
  }
});

class MyJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentRequests: [],
      recievedRequests: [],
      token: localStorage.getItem("jwtToken"),
      anchorEl: null,
      setAnchorEl: null,
    };
    this.updateStatus = this.updateStatus.bind(this);
  }
  
  componentDidMount() {
    this.getRequests();
    this.getReceivedRequests();
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
  
  // Get all recieved requests
  getReceivedRequests() {
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

  // Update request status 
  updateStatus(item) {
    const request = {
      senderId: item.senderId,
      recieverId: item.recieverId,
      startDate: item.startDate,
      endDate: item.endDate,
      accepted: true
    }
    axios.put(`request/update/${item._id}`, request, { headers: { Authorization: `Bearer ${this.state.token}` }})
    .then(res => {
      console.log(res.data);
    })
      axios.get('/request/get-requests', { headers: { Authorization: `Bearer ${this.state.token}` }})
      .then(res => {
        this.setState({
          sentRequests: res.data
        });
        console.log("Accepted the request");
      })
      .catch(err => {
        console.log(err);
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

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const open = Boolean(this.state.anchorEl);
    const ITEM_HEIGHT = 48;
    const { sentRequests, recievedRequests } = this.state;

    let Srequests;
    if (sentRequests.length > 0) {
      Srequests = sentRequests.map((item, i) => (
        <Paper className={classes.paper} key={i}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar className={classes.bigAvatar} alt="complex" src={item.reciever_info[0].photoUrl} />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {item.reciever_info[0].firstName} {item.reciever_info[0].lastName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    From: <Moment format="YYYY/MM/DD">{item.startDate}</Moment>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    To: <Moment format="YYYY/MM/DD">{item.endDate}</Moment>
                  </Typography>
                  <Grid container className={classes.location}>
                    <Grid item>
                      <RoomIcon color="secondary"/>
                    </Grid>
                    <Typography variant="body2" color="textSecondary">
                      {item.reciever_info[0].address}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  {item.accepted === true ?
                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                      Status: Accepted
                    </Typography>
                  : <Typography variant="body2" style={{ cursor: 'pointer' }}>
                      Status: Pending
                    </Typography>
                  }
                  <Button size="small" color="secondary" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.removeRequest(item) } }>
                    Remove
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">$ {item.reciever_info[0].rate}/hr</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ));
    } else {
      Srequests = <Grid item xs={12} align='center'>
                    <Typography variant="subtitle1">There is no sent requests</Typography>
                  </Grid>
    }

    let Rrequests;
    if (recievedRequests.length > 0) {
      Rrequests = recievedRequests.map((item, i) => (
        <Paper className={classes.paper} key={i}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar className={classes.bigAvatar} alt="complex" src={item.sender_info[0].photoUrl} />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {item.sender_info[0].firstName} {item.sender_info[0].lastName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    From: <Moment format="YYYY/MM/DD">{item.startDate}</Moment>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    To: <Moment format="YYYY/MM/DD">{item.endDate}</Moment>
                  </Typography>
                  <Grid container className={classes.location}>
                    <Grid item>
                      <RoomIcon color="secondary"/>
                    </Grid>
                    <Typography variant="body2" color="textSecondary">
                      {item.sender_info[0].address}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  {item.accepted === false ?
                    <Grid item>
                      <Button 
                        size="small" 
                        className={classes.button}
                        color="secondary" 
                        variant="contained" 
                        onClick={(e) => this.updateStatus(item)}
                      >
                        Accept
                      </Button> 
                      <Button 
                        size="small" 
                        color="primary" 
                        variant="contained" 
                        className={classes.button}
                        onClick={(e) => { if (window.confirm('Are you sure you wish to decline this request?')) this.removeRequest(item) } }
                      >
                        Decline
                      </Button> 
                    </Grid>   
                  : <Typography variant="body2" style={{ cursor: 'pointer' }}>
                      Status: Accepted
                    </Typography>
                  }
                </Grid>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MoreVertIcon />
                </IconButton>  
                <Menu
                  id="long-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={open}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: 200,
                    },
                  }}
                >
                  <MenuItem>Contact User</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ));
    } else {
      Rrequests = <Grid item xs={12} align='center'>
                    <Typography variant="subtitle1">There is no recieved requests</Typography>
                  </Grid>
    }
    

    return (
      <div>
        <NavigationBar></NavigationBar>
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={12} align='center'>
              <h1>My Job Requests</h1>
            </Grid>
            <Grid item xs={12} align='center'>
              <h2>Your Sent Job Requests</h2>
            </Grid>
            <Grid container>
              {Srequests}
            </Grid>
            <Grid item xs={12} align='center' style={{ marginTop: "20px" }}>
              <h2>Job Requests from Others</h2>
            </Grid> 
            <Grid container>
              {Rrequests}
            </Grid> 
          </Grid> 
        </div>   
      </div>    
    );
  }
}

export default withStyles(MyJobsStyle)(MyJobs);
