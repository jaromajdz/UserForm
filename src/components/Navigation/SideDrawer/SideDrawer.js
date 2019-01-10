import React, {Component} from 'react';
import {connect} from 'react-redux';

import styles from './SideDrawer.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

class SideDrawer extends Component {
    //console.log('SideDrawer', props.show)


render(){
    let attachedStyles=[styles.SideDrawer, styles.Close];

    if(this.props.show){
        attachedStyles=[styles.SideDrawer, styles.Open];
      }

  return (
    <Aux>
    <Backdrop click={this.props.hide} sshow={this.props.show}/>
    <div className={attachedStyles.join(" ")}>
      <div className={styles.Logo}><Logo/></div>
      <nav>
        <NavigationItems isAuthenticated = {this.props.isAuth}/>
      </nav>
    </div>
  </Aux>
  );
};

}


export default SideDrawer;
