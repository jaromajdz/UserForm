import React, { Component } from "react";

import Input from "./Input/Input";
import styles from "./SmartForm.css";

class Inputs extends Component {
  state = {
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
        validationRules: {SmartForm
          isRequired: true,
          minLenght: 8,
          regExp: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        },
        isInvalidMessage: "Is is not valid email address!",
        label: "Email address: "
      },
      surname: {
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
          regExp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        }
      }
    },
    formIsValid: false
  };

  onChangeHandler = (event, elemIndex) => {
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
      return isValid;SmartForm
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
          <input
            type="submit"
            value="Submit"
            disabled={!this.state.formIsValid}
          />
        </form>
      </div>
    );
  }
}
export default SmartForm;
