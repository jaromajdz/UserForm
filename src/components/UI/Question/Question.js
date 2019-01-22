import React from 'react';

import Button from '../Button/Button';
import Aux from '../../../hoc/Aux/Aux';

const Question = (props) =>{

  return <Aux>
          <p>{props.children}</p>
          <Button btnType="Danger" clicked={props.dontDoThis}>No</Button>
          <Button btnType="Success" clicked={props.doThis}>Yes...</Button>
        </Aux>

}

export default Question;
