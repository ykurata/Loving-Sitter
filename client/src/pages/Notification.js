import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 450,
    margin: `${theme.spacing(3)}px auto`,
    padding: theme.spacing(2),
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
}));


export default function AutoGridNoWrap() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img  className={classes.img} alt="complex"  src={require("../images/1a350ede83e5c0c4b87586c0d4bad0f66b86da37.png")} />
            </ButtonBase>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography variant='subtitle1'>Marry has requested your service for 2 hours</Typography>
            <Typography variant="caption" color="textSecondary">Dog Sitting</Typography>
            <Typography variant="subtitle1">18/10/2019</Typography>
          </Grid>
        </Grid>

        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={require("../images/4a9e3a82f8e96e82eb129a672414842b2efb5ab0.png")} />
            </ButtonBase>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography variant='subtitle1'>Yasuko has requested your service for 5 hours</Typography>
            <Typography variant="caption" color="textSecondary">Dog Sitting</Typography>
            <Typography variant="subtitle1">25/10/2019</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
