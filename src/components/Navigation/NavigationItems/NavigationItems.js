import React from 'react';
import styles from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>{

    let path = (props.isAuthenticated ? "/logout" :  "/auth");

  return  ( <ul className={styles.NavigationItems}>
      <NavigationItem link="/" exact>Main</NavigationItem>
        {props.isAuthenticated ?
          <NavigationItem link="/orders">Orders</NavigationItem>
          : null
      }
          <NavigationItem link={path}>{props.isAuthenticated ? "Log out" : "Log in"}</NavigationItem>
  </ul>)

};

export default navigationItems;
