import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import LocalFlorist from '@material-ui/icons/LocalFlorist';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Link} from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Izvještaji" />
    </ListItem>
    <ListItem component = {Link} to ="/dashboard/orders">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Narudžbe" />
    </ListItem>
    <ListItem component = {Link} to ="/dashboard/buyers">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Kupci" />
    </ListItem>
    <ListItem component = {Link} to ="/dashboard/roses">
      <ListItemIcon>
        <LocalFlorist />
      </ListItemIcon>
      <ListItemText primary="Ruže" />
    </ListItem>
   
  </div>
);
