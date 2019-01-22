import React from 'react';
import { connect } from 'react-redux';

import actionTypes from '../../store/actions/';
import SmartForm from '../SmartForm/SmartForm'

class SingUpForm extends React.Component {

  render(){
    const form = {
            email: {
            elemenType: "input",
            elementConfig: {
              type: "email",
              placeholder: "Email:"
            },
            value: "",
            isValid: false,
            touched: false,
            validationRules: {
              isRequired: true,
              minLenght: 8,
              regExp: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            },
            isInvalidMessage: "Is is not valid email address!",
            label: "Email address: "
          },
          password: {
            elemenType: "input",
            elementConfig: {
              type: "password",
              placeholder: "Password: "
            },
            value: "",
            label: "Enter your password:",
            isValid: false,
            touched: false,
            isInvalidMessage:
              " Passwor should have minimum length 8 letters and contain one upprcase letter and special character.",
            validationRules: {
              isRequired: true,
              minLenght: 8,
              regExp: /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/
          },
        },
          password1: {
            elemenType: "input",
            elementConfig: {
              type: "password",
              placeholder: "Password: "
            },
            value: "",
            label: "Repeat your password:",
            isValid: false,
            touched: false,
            isInvalidMessage:
              " Passwor should have minimum length 8 letters and contain one upprcase letter and special character.",
            validationRules: {
              isRequired: true,
              minLenght: 8,
              regExp: /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/
            }
          },

          name: {
            elemenType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Name: "
            },
            value: "",
            label: "Your name:",
            isValid: false,
            touched: false,
            isInvalidMessage: " Please enter minimum 2 characters.",
            validationRules: {
              isRequired: true,
              minLenght: 2,
            }
          },

          surname: {
            elemenType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Surname: "
            },
            value: "",
            label: "Your surname:",
            isValid: false,
            touched: false,
            isInvalidMessage: " Surnem should have minimum 2 characters",
            validationRules: {
              isRequired: true,
              minLenght: 2,
            }
          },

          telephone: {
            elemenType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Telephone: "
            },
            value: "",
            label: "Telephone number:",
            isValid: false,
            touched: false,
            isInvalidMessage:
              " Please eneter minimum 9 digits and country prefix.",
            validationRules: {
              isRequired: true,
              minLenght: 9,
            }
          },

          street: {
            elemenType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Street: "
            },
            value: "",
            label: "Street:",
            isValid: false,
            touched: false,
            isInvalidMessage:
              " This field is reguired",
            validationRules: {
              isRequired: true,
              minLenght: 2,
            }
          },
          city: {
            elemenType: "input",
            elementConfig: {
              type: "text",
              placeholder: "City: "
            },
            value: "",
            label: "City:",
            isValid: false,
            touched: false,
            isInvalidMessage:
              " This field is reguired.",
            validationRules: {
              isRequired: true,
              minLenght: 2,
            }
          },

    }

    return <SmartForm form = {form} sendButtonText = 'Register' sendHandler = {this.props.registerHandler}/>
    }
};

const mapDispatchToProps = dispatch =>{
  return {
    registerHandler: (data)=>{
      console.log('DATA', data)
      return dispatch({type: actionTypes.SINGUP_START, data: data})
    }
  }
}

export default connect(null, mapDispatchToProps)(SingUpForm);
