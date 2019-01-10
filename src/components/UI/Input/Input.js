import React from 'react';
import styles from './Input.css';

const input =(props)=>{
  let inputElement = null;

  const inputClasses = [styles.Input];
  let label='';
    //console.log('Invalida', props.invalid);
  if(props.invalid){
    inputClasses.push(styles.Invalid);
    label=props.isInvalidMessage;
    //console.log('Invalida', label);
  }

  switch(props.elemenType){
    case('input'):
        inputElement=<input className={inputClasses.join(" ")}
         {...props.elementConfig}
         value={props.value} onChange={props.changed} ref={props.key}/>;
        break;
    case('textarea'):
        inputElement=<textarea className={inputClasses.join(" ")}
        {...props.elementConfig}
        value={props.value} onChange={props.changed} ref={props.key}/>;
      break;
      case('select'):
            inputElement=<select className={inputClasses.join(" ")} value={props.value} onChange={props.changed}>
              {props.elementConfig.options.map(elem=>(
                <option key={elem.displayValue} value={elem.value}>{elem.displayValue}</option>
              ))}
            </select>;
          break;
    default:
        inputElement=<input className={inputClasses.join(" ")}
         {...props.elementConfig}
         value={props.value} onChange={props.changed} ref={props.key}/>;
  }

  return (<div className={styles.Input}>
      <label className={styles.Label}>{label}</label>
      {inputElement}
  </div>);
};

export default input;
