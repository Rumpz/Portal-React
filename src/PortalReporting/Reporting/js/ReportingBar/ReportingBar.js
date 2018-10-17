import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
/* import MoreIcon from '@material-ui/icons/MoreVert';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'; */

import NavbarDrawer from '../ReportingBar/components/NavbarDrawer/NavbarDrawer';

import styles from './css/styles';

export class ReportingBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: false,
      isDrawerOpen: false,
      dense: false,
      secondary: false,
      action: props.action
    };
  }
  

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDrawer = () => {
    this.setState({ isDrawerOpen: true });
  }

  handleDrawerClose = () => {
    this.setState({ isDrawerOpen: false });
  }

  render() {
    const { anchorEl, isDrawerOpen, action } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const { classes } = this.props;
    const userMenu = (
      <Menu
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
      >
        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleClose}>My account</MenuItem>
      </Menu>
    );

    return (
      <div style={{backgroundColor: '#7CACA7', color: 'white'}} className={classes.root}>
      <h1>Reporting Portal</h1>
        <AppBar style={{backgroundColor: '#456D8C'}} position='static'>
          <NavbarDrawer
            isDrawerOpen={isDrawerOpen}
            handleDrawerClose={this.handleDrawerClose}
            action={action}
          />
          <Toolbar>
            <IconButton onClick={this.handleDrawer} className={classes.menuButton} color='inherit' aria-label='Open drawer'>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant='title' color='inherit' noWrap>
              Menu
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                placeholder='Search…'
                disableUnderline
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <Typography className={classes.title} variant='title' color='inherit' noWrap>
            Portal Reporting
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-hidden='true' color='inherit'>
              
                <Badge className={classes.margin} badgeContent={4} color='secondary'>
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color='inherit' aria-hidden='true'>
                <Badge className={classes.margin} badgeContent={17} color='secondary'>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-hidden='true'
                aria-owns={isMenuOpen ? 'material-appbar' : null}
                aria-haspopup='true'
                onClick={this.handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {userMenu}
      </div>
    );
  }
}

ReportingBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportingBar);
