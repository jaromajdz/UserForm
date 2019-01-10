import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux/Aux';

import styles from './Input.css';



const input =(props)=>{
  //styles for texting pourpose
  //const styles ={ InputElement: 'InputElement', Invalid: 'Invalid' }

  let inputClasses = [styles.InputElement];
  let inValidMessage ='';

  if(props.isInvalid){
    inputClasses.push(styles.Invalid);
    inValidMessage = <span style={{color: 'red'}}>{props.inValidMessage}</span>;
  }

  inputClasses = inputClasses.join(" ");

  let inputElem = null;

  switch (props.elemenType) {
    case ('input'):

        inputElem = <input {...props.elementConfig}
             value={props.value}
             onChange={props.change}
             ref={props.key}
             className={inputClasses}
             />
           break;
   case ('textarea'):
          inputElem = <textarea {...props.elementConfig}
               value={props.value}
               onChange={props.change}
               ref={props.key}
               />
             break;
    case ('select'):

      let data = [];

      if (props.elementConfig.hasOwnProperty('options')){
          data =[... props.elementConfig.options]
          delete props.elementConfig.options
        }

      inputElem = <select {...props.elementConfig} onChange={props.change}>
                       {data.map(
                         elem=>(
                           <option key={elem.displayValue} value={elem.value}>{elem.displayValue}</option>
                         )
                       )}
                     </select>
         break;
         default:
      };


   return <Aux>
              <label testp="label" className={styles.Label}>
                  {props.label ? props.label : null}{inValidMessage}
               </label>
              {inputElem}
            </Aux>
};

input.propTypes ={
  elementConfig: PropTypes.object,
  value: PropTypes.any.isRequired,
  change: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool,
  inValidMessage: PropTypes.string,
  elemenType: PropTypes.string.isRequired
}




export default input;
