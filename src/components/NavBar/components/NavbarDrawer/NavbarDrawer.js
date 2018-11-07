
import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuList from './components/MenuList/MenuList';

import styles from './css/styles';

const NavbarDrawer = (props) => {
  return (
    <Drawer
      variant='persistent'
      anchor={'left'}
      open={props.isDrawerOpen}
    >
      <Divider />
      <div className={styles.root}>
        <IconButton onClick={props.handleDrawerClose}>
          {<ChevronLeftIcon />}
        </IconButton>
        <Divider />
      </div>
      <MenuList list={props.list} action={props.action} />
    </Drawer>
  );
};

export default NavbarDrawer;
