import React from 'react';

import styles from './Toolbar.css';

import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleDrawer from '../SideDrawer/ToggleDrawer/ToggleDrawer';

const toolbar = (props) =>(
  <header className={styles.Toolbar}>
    <ToggleDrawer toggle={props.showDrawer}/>
    
    <nav className={styles.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
  </header>

);

export default toolbar;
