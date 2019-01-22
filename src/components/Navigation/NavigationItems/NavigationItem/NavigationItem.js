import React, {Component} from 'react';
import styles from './NavigationItem.css';
import {NavLink } from 'react-router-dom';
import  {connect} from 'react-redux';



//import './NavigationItem.css';


const navigationItem = (props)=> {


      //console.log('Navigation item', props.clicked)
  return ( <li className={styles.NavigationItem}>
          <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={styles.active}
          >
          {props.children}
          </NavLink>
          </li>
        )


};



export default navigationItem;
