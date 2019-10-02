import React, { Component } from "react";

// import { Typography } from "@material-ui/core";
// import { withStyles } from "@material-ui/core/styles";
// import { Route, Link } from "react-router-dom";

// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import '../App.css';


// import Ping from "./Ping";

// const landinPageStyle = theme => ({
//   landingContainer: {
//     margin: theme.spacing.unit * 2
//   }
// });

class LandingPage extends Component {
//   state = {
//     welcomeMessage: "Step 1: Run the server and refresh (not running)",
//     step: 0
//   };

  // componentDidMount() {
  //   fetch("/welcome")
  //     .then(res => {
  //       console.log(res);
  //       if (res.status === 200) return res.json();
  //       else throw Error("Couldn't connect to the server");
  //     })
  //     .then(res => {
  //       this.setState({ welcomeMessage: res.welcomeMessage });
  //       this.incrementStep();
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     });
  // }

  // incrementStep = () => {
  //   this.setState(prevState => ({ step: (prevState.step += 1) }));
  // };

  render() {
    return(
      <div className="App">
        <div className="App_aside">
          <div className="info-box">
          <Grid container>
          <Grid item xs={12}>
            <h1>Find the care your dog deserves</h1>
        </Grid>

        </Grid>
          </div>
        </div>
        <div className="App_form">  
        </div>

      </div>

    );
  }
}
    
    // const { classes } = this.props;
    // return (
    //   <div className={classes.landingContainer}>
    //     <Typography>{this.state.welcomeMessage}</Typography>
    //     {this.state.step >= 1 && (
    //       <React.Fragment>
    //         <Link to="/ping">Step 2: Click here </Link>
    //         <Route
    //           path="/ping"
    //           render={props => {
    //             return (
    //               <Ping
    //                 {...props}
    //                 incrementStep={this.incrementStep}
    //                 step={this.state.step}
    //               />
    //             );
    //           }}
    //         />
    //       </React.Fragment>
    //     )}
    //     {this.state.step >= 3 && (
    //       <Typography>All done! Now go make a pull request!</Typography>
    //     )}
    //   </div>
    // );
//   }
// }

export default LandingPage;
// export default withStyles(landinPageStyle)(LandingPage);
