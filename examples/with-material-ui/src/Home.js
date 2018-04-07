import React, { Component } from 'react';
import logo from './react.svg';
import './Home.css';
import { Link } from 'react-router-dom';
import {
  Button,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  link: {
    textDecoration: 'none',
  },
};

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { whatever: 'stuff' };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="Home">
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={logo}
            title="Welcome to After.js"
          />
          <CardContent>
            <Typography component="p">
              To get started, edit <code>src/Home.js</code> or{' '}
              <code>src/About.js</code> and save to reload.
            </Typography>
          </CardContent>
          <CardActions>
            <Link className={classes.link} to="/about">
              <Button size="small" color="primary">
                About
              </Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
