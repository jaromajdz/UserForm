import React from 'react';

import styles from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleDrawer from '../SideDrawer/ToggleDrawer/ToggleDrawer';

const toolbar = (props) =>(
  <header className={styles.Toolbar}>
    <ToggleDrawer toggle={props.showDrawer}/>
    <div className={styles.Logo}><Logo/></div>
    <nav className={styles.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
  </header>

);

export default toolbar;
