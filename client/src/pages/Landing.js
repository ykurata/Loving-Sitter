import React, { useState} from "react";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from "../components/Navbar";
import landing from "../images/landing-2.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  title: {
    marginTop: 40,
    marginBottom: 10,
    fontWeight: "bold"
  },
  image: {
    backgroundImage: `url(${landing})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      minHeight: 450
    },
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    padding: '40px',
    width: '100%', // Fix IE 11 issue.
    [theme.breakpoints.up('md')]: {
      marginTop: '50px'
    },
  },
  mainText: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    },
  },
  label: {
    marginTop: '10px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
}));

const Landing = (props) => {
  const classes = useStyles();
  const [userInput, setUserInput] = useState({
    location: "",
    dropIn: "",
    dropOff: ""  
  });

  const handleChange = e => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  
  return (
    <div>
      <Navbar/>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={12} md={6} className={classes.image} />
        <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
          <Grid container className={classes.form}>
            <Grid item xs={12} className={classes.mainText}>
              <Typography variant="h3" className={classes.title}>Find the care your dog deserves</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.label}>
                Where
              </Typography>
              <TextField
                id="outlined-bare"
                placeholder="Anywhere"
                margin="normal"
                variant="outlined"
                value={userInput.location}
                onChange={handleChange}
                fullWidth
              />    
              <Typography variant="subtitle1" className={classes.label}>
                Drop In/ Drop off
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    type="date"
                    name="birthDate"
                    id="standard-birthDate"
                    value={userInput.dropIn}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="date"
                    name="birthDate"
                    id="standard-birthDate"
                    value={userInput.dropOff}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                style={{ backgroundColor: "#f04040", color: "white", marginTop: "30px"}}
              >
                FIND MY DOG SITTER
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Landing;
