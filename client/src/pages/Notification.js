import React from 'react';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 450,
    margin: `${theme.spacing(1)}px auto`,
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
  }
}));

export default function Notification() {
  const classes = useStyles();

  return (
    <div>
      <List style={{maxHeight: 200, overflow: 'auto'}}>
        <Card className={classes.card}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img  className={classes.img} alt="complex"  src={require("../images/1a350ede83e5c0c4b87586c0d4bad0f66b86da37.png")} />
              </ButtonBase>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography noWrap variant='subtitle1'>Marry has requested your service</Typography>
              <Typography variant="caption" color="textSecondary">Dog Sitting</Typography>
              <Typography variant="subtitle1">18/10/2019</Typography>
            </Grid>
          </Grid>
          <Divider />
        </Card>

        <Card className={classes.card}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={require("../images/4a9e3a82f8e96e82eb129a672414842b2efb5ab0.png")} />
              </ButtonBase>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography noWrap variant='subtitle1'>Scott has requested your service</Typography>
              <Typography variant="caption" color="textSecondary">Dog Sitting</Typography>
              <Typography variant="subtitle1">25/10/2019</Typography>
            </Grid>
          </Grid>
          <Divider />
        </Card>
      </List>
    </div>
  );
};
