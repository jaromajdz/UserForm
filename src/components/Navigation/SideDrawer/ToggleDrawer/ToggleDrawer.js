import React from 'react';

import styles from './ToggleDrawer.css';

const toggleDrawer = (props)=>(
  <div className={styles.ToggleDrawer} onClick={()=>props.toggle()}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default toggleDrawer;
