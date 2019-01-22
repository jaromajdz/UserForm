import React from 'react';

import styles from './Button.css'

const button =(props)=>{

 let type = props.disabled ? styles['Disabled']: styles[props.btnType]

 return (   <button
      onClick={props.clicked}
      className={[styles.Button, type].join(" ")}
      disabled = {props.disabled}
   >
      {props.children}
    </button>);
};





export default button;
