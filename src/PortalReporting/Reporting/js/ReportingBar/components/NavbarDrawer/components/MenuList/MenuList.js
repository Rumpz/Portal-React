import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

export const MenuList = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ListElements subMenuList={props.subMenuList} list={props.list} action={props.action} />
    </div>
  );
};

const ListElements = (props) => {
  const list = props.list.map((element, index) => {
    return (
      <ListItem key={element + index} button >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={element} onClick={props.action} />
      </ListItem>
    );
  });
  return (
    <List>
      <ListSubheader component='div'>Pesquisar categorias</ListSubheader>
      {list}
      <Divider />
    </List>
  );
};

MenuList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuList);
