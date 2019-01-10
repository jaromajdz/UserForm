import React, {Component} from 'react';

import styles from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {

//  shouldComponentUpdate (nextProps, nextState) {
//    return (nextProps.visibility!==this.props.visibility||
//    this.props.children!==nextProps.children);
//  }


  render (){
    let style = styles.Modal+" "+styles.Close;
      if(this.props.visibility){
      style = styles.Modal+" "+styles.Open;
      }



  //console.log('style', style)
  return (

  <Aux>
    <Backdrop sshow={this.props.visibility} click={this.props.modalClosed}/>
    <div className={style}>
    {this.props.children}
  </div>
  </Aux>
  );
  }
};

export default Modal;
