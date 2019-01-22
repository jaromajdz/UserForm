import React from 'react';
import PropTypes from 'prop-types';

import style from './Backdrop.css';


const backdrop = (props) =>{
  return <div className={style.Backdrop} onClick={props.click}></div>
      }

backdrop.propTypes = {
  click: PropTypes.func.isRequired
}

export default backdrop;
