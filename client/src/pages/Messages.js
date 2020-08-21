import React, { useState, useEffect } from "react";
import axios from "axios";
import openSocket from "socket.io-client";
import Moment from 'react-moment';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Navbar from "../components/Navbar";

const MessagesStyle = makeStyles(theme => ({
  list: {
    maxHeight: "81vh",
    overflow: "auto"
  },
  cardStyle: {
    height: "82vh"
  },
  avatar: {
    width: 50,
    height: 50,
    marginBottom: "5px",
    marginTop: "5px",
    marginLeft: "10px",
    marginRight: "10px"
  },
  title: {
    borderTop: "0.5px solid #e6e6e6",
    borderBottom: "0.5px solid #e6e6e6",
    textAlign: "center"
  },
  addIcon: {
    height: "100%",
    verticalAlign: "middle"
  },
  border: {
    border: "0.5px solid #e6e6e6",
    borderRight: "0px"
  },
  messagesArea: {
    height: "70vh",
    overflow: "auto",
  },
  messagingArea: {
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
    height: "100%"
  },
  sendButton: {
    margin: theme.spacing(1),
    top: "30%",
    backgroundColor: "#f04040"
  },
  sentMessages: {
    textAlign: "right",
    paddingRight: "10px",
    paddingLeft: "10px"
  },
  sentMessageLength: {
    padding: 0,
  },
  sentMessageLengthLeft: {
    padding: 0,
    textAlign: "left",
  },
  msg: {
    backgroundColor: "#3385ff",
    color: "white",
    boxShadow: "0px 0px 4px 0px lightgrey",
    borderRadius: "10px",
    padding: "12px"
  },
  msgLeft: {
    backgroundColor: "white",
    boxShadow: "0px 0px 4px 0px lightgrey",
    borderRadius: "10px",
    padding: "12px"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    maxHeight: "75vh",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  date: {
    fontSize: 10,
    paddingBottom: "5px"
  },
  dateLeft: {
    fontSize: 10,
    textAlign: "left",
    paddingBottom: "5px"
  }
}));

const Messages = (props) => {
  const classes = MessagesStyle();
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [conversationId, setConversationId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const socket = openSocket("http://localhost:3001");
     
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  // Handle message change
  const messageChange = e => {
    setMessage(e.target.value);
  };
  
  useEffect(() => {
    socket.on("new message", msg => {
      setMessages([...messages, msg]);
    });
  }, []);
  
   // Get a list of profiles 
  useEffect(() => {
    axios.get('/profile/get/', { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        setProfiles(res.data.profile);
      })
      .catch(err => {
        console.log("Error fetching and parsing data", err);
      }); 
  }, []);
  
  // GET a list of conversations and recipient profiles
  useEffect(() => {
    axios.get('/conversation/list/', { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        setConversation(res.data);
      })
      .catch(err => {
        console.log("Error fetching and parsing data", err);
      }); 
  }, []);

  // Get a conversation Id to start sending messages
  const getMessages = e => {
    setConversationId(e.target.id);
    setFirstName(e.target.getAttribute("firstname"));
    setLastName(e.target.getAttribute("lastname"));
    setPhotoUrl(e.target.getAttribute("photourl"));

    axios.get(`/conversation/${e.target.id}`, { headers: { Authorization: `Bearer ${token}` }} )
      .then(res => {
        let msgs = res.data.map(item => ({ 
          id: item._id,
          body: item.body,
          userId: item.userId,
          createdAt: item.createdAt
        }));
        setMessages(msgs);
      })
      .catch(err => {
        console.log(err);
      }); 
  };

  // Create a new conversation 
  const createConversation = e => {
    e.preventDefault();
    const newConversation = {
      recipientId: e.target.id
    }
    axios.post('/conversation/', newConversation, { headers: { Authorization: `Bearer ${token}` }} )
      .then(res => {
        console.log(res.data);
        axios.get('/conversation/list/', { headers: { Authorization: `Bearer ${token}` }})
        .then(res => {
          setConversation(res.data);
        })
        .catch(err => {
          console.log(err);
        }); 
      })
      .catch(err => {
        console.log(err);
      }); 
  }

  // Create a new message
  const createMessage = e => {
    e.preventDefault();
    const newMessage = {
      conversationId: conversationId,
      body: message,
      userId: userId
    }
    axios.post(`/conversation/${conversationId}/message`, newMessage, { headers: { Authorization: `Bearer ${token}` }} )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
    socket.emit("new message", newMessage);
    setMessage("");  
  }

  const showMessage = messages.map((message, i) => (
    message.userId._id === userId ? 
      <span key={i} >
        <p className={classes.sentMessageLength}>
          <span className={classes.msg}>{message.body}</span>
        </p>
        <Typography variant="subtitle1" color="textSecondary" className={classes.date}><Moment format="MMMM Do YYYY, h:mm a">{message.createdAt}</Moment></Typography>
      </span>
    : !message.userId._id ?
      <span key={i} >
        <p key={i} className={classes.sentMessageLength}>
          <span className={classes.msg}>{message.body}</span>
        </p>
        <Typography variant="subtitle1" color="textSecondary" className={classes.date}><Moment format="MMMM Do YYYY, h:mm a">{message.createdAt}</Moment></Typography>
      </span>
    : 
      <span key={i} >
        <p key={i} className={classes.sentMessageLengthLeft}>
          <span className={classes.msgLeft}>{message.body}</span>
        </p>
        <Typography variant="subtitle1" color="textSecondary" className={classes.dateLeft}><Moment format="MMMM Do YYYY, h:mm a">{message.createdAt}</Moment></Typography>
      </span>
  ));
    
  return (
    <div>
      <Navbar/>
      <Grid container>
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={11} className={classes.title}>
              <h3>Inbox Messages</h3>
            </Grid>
            <Grid item xs={1} className={classes.title}>
              <IconButton size="small" className={classes.addIcon} onClick={handleOpen}>
                <AddBoxIcon />
              </IconButton>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <h2 id="transition-modal-title" style={{textAlign: "center"}}>Dog Sitters</h2>
                  
                      {profiles.map(item => (
                        item.userId !== userId ?
                        <ListItem
                          key={item._id}
                          id={item.userId}
                          button
                          onClick={createConversation}
                        > 
                          {item.photoUrl ?
                            <Avatar
                              className={classes.avatar}
                              alt="Remy Sharp" 
                              src={item.photoUrl}
                              id={item.userId}
                            />
                          : 
                            <AccountCircleIcon className={classes.avatar} id={item.userId} color="disabled"/>
                          }
                          <Typography id={item.userId} variant="h6">{item.firstName} {item.lastName}</Typography>
                        </ListItem>
                        : null
                      ))}
                      
                  </div>
                </Fade>
              </Modal>
            </Grid>
            <Grid item xs={12}>
              
              <List className={classes.list}>
                {conversation.map(item => (
                  item.members_info[0].userId === userId ?
                  <ListItem 
                    alignItems="flex-start" 
                    button 
                    key={item._id} 
                    id={item._id} 
                    firstname={item.members_info[1].firstName} 
                    lastname={item.members_info[1].lastName}
                    photourl={item.members_info[1].photoUrl}
                    onClick={getMessages} 
                  > 
                    {item.members_info[1].photoUrl ?
                      <Avatar
                        className={classes.avatar}
                        id={item._id} 
                        firstname={item.members_info[1].firstName} 
                        lastname={item.members_info[1].lastName}
                        photourl={item.members_info[1].photoUrl}
                        alt="Remy Sharp" 
                        src={item.members_info[1].photoUrl}
                      />
                    : 
                      <AccountCircleIcon className={classes.avatar} id={item._id} color="disabled"/>
                      
                    }
                    <Typography 
                      id={item._id} 
                      firstname={item.members_info[1].firstName} 
                      lastname={item.members_info[1].lastName}
                      photourl={item.members_info[1].photoUrl}
                      style={{marginTop: "10px" }} 
                      variant="h6"
                    >
                      {item.members_info[1].firstName} {item.members_info[1].lastName}
                    </Typography>
                  </ListItem>
                
                : <ListItem
                    alignItems="flex-start" 
                    button 
                    key={item._id} 
                    id={item._id} 
                    firstname={item.members_info[0].firstName} 
                    lastname={item.members_info[0].lastName}
                    photourl={item.members_info[0].photoUrl}
                    onClick={getMessages}
                  > 
                    {item.members_info[0].photoUrl ?
                      <Avatar
                        className={classes.avatar}
                        id={item._id} 
                        firstname={item.members_info[0].firstName} 
                        lastname={item.members_info[0].lastName}
                        photourl={item.members_info[0].photoUrl}
                        alt="Remy Sharp" 
                        src={item.members_info[0].photoUrl}
                      />
                    : 
                      <AccountCircleIcon className={classes.avatar} id={item._id} color="disabled"/>
                    }
                    <Typography 
                      id={item._id} 
                      firstname={item.members_info[0].firstName} 
                      lastname={item.members_info[0].lastName}
                      photourl={item.members_info[0].photoUrl}
                      style={{marginTop: "10px" }} 
                      variant="h6"
                    >
                      {item.members_info[0].firstName} {item.members_info[0].lastName}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container className={classes.border}>
              {photoUrl ? 
                  <Grid item xs={1}>
                    <Avatar
                    alt="Remy Sharp"
                    className={classes.avatar}
                    src={photoUrl}
                    />
                  </Grid>    
                : photoUrl === null ?
                  <Grid item xs={1}>
                    <AccountCircleIcon className={classes.avatar} color="disabled"/>
                  </Grid>
                : 
                  <Grid item xs={1}>
                    <Avatar
                    alt="Remy Sharp"
                    className={classes.avatar}
                    style={{ backgroundColor: "white"}}
                    />
                  </Grid>
              }
              <Grid item xs={11}>
                <h3>{firstName} {lastName}</h3>
              </Grid>
            </Grid>
          <Grid container className={classes.messagesArea}>
            <Grid item xs={12}>
              <div className={classes.sentMessages}>{showMessage}</div>
            </Grid>
          </Grid>
          
          {conversationId ? (
            <Grid container className={classes.messagingArea}>
              <Grid item xs={8}>
                <TextField
                  id="standard-bare"
                  name="message"
                  className={classes.textField}
                  placeholder="Type a message..."
                  margin="normal"
                  value={message}
                  onChange={messageChange}
                  inputProps={{
                    "aria-label": "bare",
                    className: classes.input1
                  }}
                />
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={2}>
                <div className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    className={classes.sendButton}
                    onClick={createMessage}
                  >
                    Send
                  </Button>
                </div>
                <Grid item xs={1}></Grid>
              </Grid>
            </Grid> 
            ) : null }

        </Grid>
      </Grid>
    </div>
  );
}

export default Messages;
