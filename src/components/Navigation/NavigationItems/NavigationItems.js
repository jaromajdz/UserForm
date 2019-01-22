import React from 'react';
import styles from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>{
    console.log('navigationItems', props.isAuthenticated)
    let path = (props.isAuthenticated ? "/logout" :  "/auth");

  return  ( <ul className={styles.NavigationItems}>
      <NavigationItem link="/" exact>Main</NavigationItem>
        {props.isAuthenticated ?
          <NavigationItem link="/orders">Orders</NavigationItem>
          : null
      }
          <NavigationItem link={path}>{props.isAuthenticated ? "Log out" : "Log in"}</NavigationItem>

        {props.isAuthenticated ? null : <NavigationItem link="/singupform">Sign up</NavigationItem>}
        {props.isAuthenticated ? <NavigationItem link="/editdata">Account</NavigationItem> : null}
</ul>)

};

export default navigationItems;
