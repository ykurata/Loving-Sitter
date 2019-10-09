import React, { Component } from "react";
// import NavigationBar from "./Navbar";
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class ProfileListPage extends Component {
    render(){
        return(
            <div>
                {/* <NavigationBar></NavigationBar> */}
                <Grid container spacing={3}>
        <Grid item xs={12} className="center">
            <h1>Your search results</h1>
            </Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
            <Grid container spacing={3}>
        <Grid item xs={4} className="center">



        <Card>
      <CardActionArea>
        <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="140"
          image={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>




















        </Grid>
        <Grid item xs={4} className="center"><h1>2</h1></Grid>
        <Grid item xs={4} className="center"><h1>3</h1></Grid>
            </Grid>

            </Grid>
            <Grid item xs={1}></Grid>

            </Grid>

            </div>

        );
    }
}
export default ProfileListPage