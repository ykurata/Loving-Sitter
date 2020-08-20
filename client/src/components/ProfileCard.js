import React from "react";
import { Link } from 'react-router-dom';

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import RoomIcon from "@material-ui/icons/Room";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

const CardStyles = makeStyles(theme => ({
  avatar: {
    width: 100,
    height: 100,
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px"
  },
  card: {
    width: 345,
    maxWidth: 345,
    margin: "30px"
  },
  location: {
    height: 50
  }
}));

const ProfileCard = (props) => {
  const classes = CardStyles();
  
  let list;
  if (props.data.length === 0) {
    list = <Typography variant="h6" align="center" style={{ marginTop: "30px"}}>There is no profiles</Typography>           
  } else {
    list = props.data.map((profile, i) => 
      profile.userId !== props.userId ?
        <Card className={classes.card} key={i} component={Link} to={`/profile-details/${profile.userId}`} style={{ textDecoration: 'none' }}>
          <CardActionArea>
            <CardContent>
              <Grid container>
                {profile.photoUrl ?
                  <Avatar className={classes.avatar} src={profile.photoUrl}/>
                : <AccountCircleIcon className={classes.avatar} color="disabled"/>}
              </Grid>
              <Typography gutterBottom variant="h5" component="h2" align="center">
                {profile.firstName} {profile.lastName}
              </Typography>
              <Box component="fieldset" mb={3} borderColor="transparent" align="center">
                <Rating value={5} readOnly />
              </Box>
              <Typography variant="body2" color="textSecondary" component="p" noWrap align="center">
                {profile.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Divider />
          <CardActions className={classes.location}>
            <Grid container>
              <RoomIcon color="secondary" />
              <Grid item xs={8}>
                <Typography component='span' variant="body1">{profile.address}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography  component='span' variant="body1">
                  <Box textAlign="right" fontWeight="fontWeightBold">
                    $ {profile.rate}/hr
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </CardActions>
        </Card>   
      : null   
    );
  }

  return (
    <Grid container justify="center">
      {list}
    </Grid> 
  );
}

export default ProfileCard;