import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function NavigationBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Loving Sitter (Logo)
          </Typography>
          <Button color="inherit">BECOME A SITTER</Button>
          <Button color="inherit">My Sitters</Button>
          <Button color="inherit">Messages</Button>
          <Button color="inherit">img</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
