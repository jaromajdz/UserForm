import React, { Component } from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SmartForm from './SmartForm';
import Input from './SmartForm/SmartForm';

configure({adapter: new Adapter()});

const setup = (state=null, props={}) => {
    const wrapper = shallow(<SmartForm {...props}/>);
    if(state) wrapper.setState(state);
    return wrapper;
}

const state = {
    form:
      {
        name: {
          elemenType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your name:'
        },
      value: 'Jarek',
      label: 'Enter your name:',
      isValid: false,
      touched: false,
      isInvalidMessage: 'Name should contain minimum 2 letters',
      validationRules: {
          isRequired: true,
          minLenght: 2
      }
    }
  }
 }

describe('<SmartForm/ component>',()=>{


  it('Should render form once',()=>{

    expect(setup().find('form')).toHaveLength(1);

  });

  it('Form has a submit button',()=>{

        expect(setup().find('[type="submit"]')).toHaveLength(1)
  });

  it('Contain SmartForm base on configuration from state',()=>{

     expect(setup(state, ).find(Input)).toHaveLength(1);

  });

});
