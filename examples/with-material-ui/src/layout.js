import React from 'react';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from 'material-ui/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  CssBaseline,
  Drawer,
  Divider,
} from 'material-ui';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Menu, Explore, Home } from 'material-ui-icons';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { green, red } from 'material-ui/colors';

const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
    type: 'light',
  },
});

const drawerWidth = 250;

const styles = {
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflowX: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    color: 'white',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    overflowX: 'hidden',
    height: 'auto',
    transition: theme.transitions.create(['width', 'opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerLink: {
    textDecoration: 'none',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
};

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: true,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    this.setState({
      loaded: true,
    });
  }

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  render() {
    const { classes, children } = this.props;
    const { drawerOpen } = this.state;

    return (
      <MuiThemeProvider sheetsManager={new Map()} theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="absolute" className={classNames(classes.appBar)}>
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={this.toggleDrawer}
              >
                <Menu />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Material UI
              </Typography>
              <Button color="inherit">Sign in</Button>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            anchor="left"
            open={drawerOpen}
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.drawerOpen && classes.drawerPaperClose
              ),
            }}
          >
            <div style={{ width: drawerWidth }}>
              <div style={{ height: '60px' }} />
              <Divider />
              <List>
                <NavLink className={classes.drawerLink} to="/">
                  <ListItem button title="Home">
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </NavLink>
                <NavLink className={classes.drawerLink} to="/about">
                  <ListItem button title="About">
                    <ListItemIcon>
                      <Explore />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                  </ListItem>
                </NavLink>
              </List>
            </div>
          </Drawer>

          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Layout);
