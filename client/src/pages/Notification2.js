import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  image: {
    borderRadius: 0,
    width: 60,
    height: 70,
    marginRight: 10
  }
}));

export default function Notification2() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.image} alt="Remy Sharp" src={require("../images/4a9e3a82f8e96e82eb129a672414842b2efb5ab0.png")} />
        </ListItemAvatar>
        <ListItemText
          primary="Yasuko Kurata has requested your service for 5 hours"
          // <Typography variant='subtitle1'>Marry has requested your service for 2 hours</Typography>
          // <Typography variant="caption" color="textSecondary">Dog Sitting</Typography>
          // <Typography variant="subtitle1">18/10/2019</Typography>
        />
      </ListItem>

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.image} alt="Travis Howard" src={require("../images/1a350ede83e5c0c4b87586c0d4bad0f66b86da37.png")} />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
