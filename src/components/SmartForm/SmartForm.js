import React, { Component } from "react";
import PropTypes from 'prop-types';

import Input from "./Input/Input";
import Button from "../UI/Button/Button"
import styles from "./SmartForm.css";


class SmartForm extends Component {
  state = {
    form: {},
    formIsValid: false,
    cancel: false
  };

  componentDidMount(){
    this.cancelChanges();
  }

static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.cancel!==prevState.cancel){
        return {cancel: nextProps.cancel}
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.cancel!==prevState.cancel){
      this.cancelChanges();
      //console.log(this.props.cancel, this.state.cancel)
      //this.setState({cancel: this.props.cancel})
    }
  }

  cancelChanges = ()=>{
    this.setState({form: {...this.props.form}, formIsValid: (this.props.isValid? this.props.isValid : false)})
  }

  sendHandler = ()=>{
      let data = {}

      for (let key in this.state.form) {
        data[key] = this.state.form[key].value
      }

    if(this.props.sendHandler){
        this.props.sendHandler(data)
      }

    }

  onChangeHandler = (event, elemIndex) => {

    event.preventDefault();

    const updateForm = {...this.state.form};
    const update = {...updateForm[elemIndex]};

    update.touched = true;
    update.value = event.target.value;
    update.isValid = this.checkValidity(update.value, update.validationRules);

    updateForm[elemIndex] = update;

    let formIsValid = true;

    for (let key in updateForm) {
      formIsValid = updateForm[key].isValid && formIsValid;
    }

    this.setState({ form: updateForm, formIsValid: formIsValid });
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules) {
      for (let key in rules) {
        switch (key) {
          case "isRequired":
            isValid = value.trim() !== "" && isValid;
            break;
          case "maxLenght":
            isValid = value.length <= rules.maxLenght && isValid;
            break;
          case "minLenght":
            isValid = value.length >= rules.minLenght && isValid;
            break;
          case "regExp":
            isValid = rules.regExp.test(value) && isValid;
            break;
          default:
        }
      }
      return isValid;
    }
  }

  render() {
    let myForm = [];

    for (let key in this.state.form) {
      let conf = { ...this.state.form[key] };
      myForm.push(
        <Input
          elemenType={conf.elemenType}
          elementConfig={conf.elementConfig}
          isInvalid={!conf.isValid && conf.touched}
          inValidMessage={conf.isInvalidMessage}
          label={conf.label}
          change={event => this.onChangeHandler(event, key)}
          value={conf.value}
          key={key}
        />
      );
    }



    return (
      <div className={styles.Form}>
        <form noValidate>
          {myForm}
        </form>
      <div>
       <Button
          disabled={!this.state.formIsValid}
          clicked = {this.sendHandler}
          btnType = "Success"
        >{this.props.sendButtonText}</Button>
      <Button
        disabled={!this.state.formIsValid}
        clicked = {this.cancelChanges}
        btnType = 'Danger'
        >Cancel</Button>
    </div>
      </div>
    );
  }
}

SmartForm.defaultProps = {
  sendButtonText: 'Log in',
  form: {
        email: {
        elemenType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your name:"
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
          placeholder: "Your password: "
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
        }
      },
    }
}


export default SmartForm;
