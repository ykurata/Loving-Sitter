import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import NavigationBar from "./Navbar";
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import SideNavigationBar from "./SideNavBar";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// import SimpleSnackbar from "./snackbar";
import { Snackbar, IconButton } from "@material-ui/core";

const detailsPageStyle = theme => ({
    detailsContainer: {
        margin: theme.spacing(2)
    },
    container: {
        marginBottom: theme.spacing(100),
    },
    bigAvatar: {
        //Make Responsive
        width: 300,
        height: 300,
    },
    root: {
        flexGrow: 1,
    },
});

const initalState = {
    firstName: "Your Name",
    lastName: "",
    gender: "",
    birthDate: "",
    phone: "",
    address: "Your address",
    description: "Lorem ipsum dolor sit amet adipiscing bibendum sem orci tempus aliquet gravida, orci amet iaculis aptent blandit quam accumsan donec in facilisis, cursus ante curabitur aliquet condimentum tincidunt facilisis non cubilia lorem et pretium aliquam phasellus ipsum metus quisque auctor tristique donec nibh, praesent congue ultricies aenean ornare ligula sagittis proin sed vestibulum purus tempus aenean neque aliquam curae vivamus purus egestas ligula tincidunt nullam. Dolor id fri",
    rate: "$14/hr",
};

class ProfileDetails extends Component {

    state = initalState;

    constructor(props) {
        super(props)
        this.handleGet = this.handleGet.bind(this);
    }

    handleGet = event => {
        event.preventDefault();
        console.log(this.state);
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={this.state.snackbaropen}
                    autoHideDuration={3000}
                    onClose={this.snackbarClose}
                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton
                            key="close"
                            arial-label="Close"
                            color="inherit"
                            onClick={this.snackbarClose}
                        ></IconButton>
                    ]}
                />
                <NavigationBar></NavigationBar>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={7}>
                            <Box width={1} boxShadow={2}>
                                <Box width={1} display="flex" justifyContent="center" >
                                    <Avatar alt="Your Profile Picture" src={this.state.file} className={classes.bigAvatar} />
                                </Box>
                                <Box width={1} display="flex" justifyContent="center" >
                                    <h2>{this.state.firstName} {this.state.lastName}</h2>
                                </Box>
                                <Box width={1} display="flex" justifyContent="center" >
                                    <p>Loving pet sitter</p>
                                </Box>

                                <Box width={1} display="flex" justifyContent="center" >
                                    <em>{this.state.address}</em>
                                </Box>

                                <Box width={1} display="flex" justifyContent="flex-start">
                                    <h2>About Me</h2>
                                </Box>
                                <Box width={1} display="flex" justifyContent="flex-start">
                                    <p>{this.state.description}</p>
                                </Box>
                            </Box>

                        </Grid>
                        <Grid item xs={3}>
                            <Box width={1} boxShadow={2}>
                                <Box display="flex" justifyContent="center">
                                    <h2>{this.state.rate}</h2>
                                </Box>

                                {/*Implement Rating Stars*/}
                                <Box display="flex" justifyContent="center">
                                    <TextField
                                        id="drop-in"
                                        label="Drop In"
                                        type="datetime-local"
                                        defaultValue="2019-05-24T10:30"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Box>
                                <Box display="flex" justifyContent="center">
                                    <TextField
                                        id="drop-out"
                                        label="Drop Out"
                                        type="datetime-local"
                                        defaultValue="2019-05-24T10:30"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Box>
                                <Box display="flex" justifyContent="center">
                                    <Button size="large" variant="contained" className="request-button" >
                                        Send Request
                                </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                {/* <SimpleSnackbar></SimpleSnackbar> */}
            </div>
        );
    }
}

export default withStyles(detailsPageStyle)(ProfileDetails);
