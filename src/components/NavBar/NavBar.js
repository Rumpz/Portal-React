import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

// Custom imports
import NavbarDrawer from './components/NavbarDrawer/NavbarDrawer';
import { fetchMenus } from './API';

import styles from './css/styles';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: false,
      isDrawerOpen: false,
      dense: false,
      secondary: false,
      action: props.action,
      list: []
    };
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDrawer = () => {
    fetchMenus().then(Response => {
      this.setState({
        list: Response.data.map((e) => { return {name: e.name, link: e.link} }),
        isDrawerOpen: true
      })
    }).catch(err => {
      if (err.response.status === 500) { 
        return alert(`Erro de acesso ao servidor: ${err}`);
      }
      if (err.response.status === 404) { 
        return this.setState({
          list: [{
            name: 'Efectuar Login',
            link: '/login'
          }],
          isDrawerOpen: true
        })
      }
    });
  }

  handleDrawerClose = () => {
    this.setState({ isDrawerOpen: false });
  }

  handleMenu = event => {
    window.location.replace(event)
  }
    
  render() {
    const { isDrawerOpen, action, list } = this.state;
    const { classes } = this.props;
    return (
      <div style={{backgroundColor: '#7CACA7', color: 'white'}} className={classes.root}>
        <AppBar style={{backgroundColor: '#456D8C'}} position='static'>
          <NavbarDrawer
            isDrawerOpen={isDrawerOpen}
            handleDrawerClose={this.handleDrawerClose}
            action={this.handleMenu}
            list={list}
          />
          <Toolbar>
            <IconButton onClick={this.handleDrawer} className={classes.menuButton} color='inherit' aria-label='Open drawer'>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant='title' color='inherit' noWrap>
              Menu
            </Typography>
            <Typography style={{marginLeft: '80px'}} className={classes.title} variant='title' color='inherit' noWrap>
              Portal Reporting Beta 1.0b
            </Typography>
            <span style={{marginLeft: 'auto', marginRight: '0px'}}>
              <a style={{color: 'white'}} href='/logout'><i className='material-icons'> power_settings_new</i></a>
            </span>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);

// SEARCH BAR
/* <div className={classes.search}>
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
</div> */