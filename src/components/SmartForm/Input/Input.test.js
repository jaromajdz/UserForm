import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import toJson from 'enzyme-to-json';

import Input from './Input';
import styles from './Input.css';

configure({adapter: new Adapter()});

const setup = (props=null)=>{
    return shallow(<Input {...props}/>);
}

const config = {
  elemenType: 'input',
  elementConfig: {type: 'text', name: 'elemel', options: [
            {value: 'fastes', displayValue: 'Fastes'},
            {value: 'normal', displayValue: 'Normal'}
          ]},
  name: 'elemel',
  value: '',
  key: null
}


describe('Checks the <Input/> component',()=>{

    it('should render input elem type text using default props',()=>{
        let conf = {...config}
        delete config.options
        expect(setup(config).find('[type="text"]')).toHaveLength(1);
    });

    it('should render input elem type button using props',()=>{
        let conf={...config}
        conf['elemenType']='input';
        conf['elementConfig'] = {type: 'button', name: 'elemel'}
        expect(setup(conf).find('[type="button"]')).toHaveLength(1);
      });

    it('when isInvalid prop is set to false it should contains Invalid css class',()=>{
          config['isInvalid'] = true;
          const jstring = JSON.stringify(toJson(setup(config)));
          //console.log('Json', jstring);
         expect(jstring).toContain('"className":" "');
        });

    it('when isInvalid prop is set to true and inValidMessage is set, it displays message',()=>{
            config['isInvalid'] = true;
            config['inValidMessage'] = 'Bug';
            expect(setup(config).find('[testp="label"]').text()).toContain('Bug');
        });

    it('when the props.label is set should be show', ()=>{
      config['isInvalid'] = false;
      config['label'] = 'Message';
      expect(setup(config).find('[testp="label"]').text()).toContain('Message');

    });

    it('when the props.label is set and isInvalid and inValidMessage should be show all', ()=>{
      config['isInvalid'] = true;
      expect(setup(config).find('[testp="label"]').text()).toContain('MessageBug');

    });

    it('render textarea',()=>{
                config['elemenType'] = 'textarea';
          expect(setup(config).find('textarea')).toHaveLength(1);
        });


    it('render select',()=>{
        config['elemenType'] = 'select';
        expect(setup(config).find('select').children()).toHaveLength(2);
      });

});
