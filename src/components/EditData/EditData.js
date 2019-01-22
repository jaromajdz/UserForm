import React from 'react';
import { connect } from 'react-redux';

import actionTypes from '../../store/actions/';
import SmartForm from '../SmartForm/SmartForm'
import Spinner from '../UI/Spinner/Spinner'
import Question from '../UI/Question/Question'
import Modal from '../UI/Modal/Modal'
import Aux from '../../hoc/Aux/Aux'
import * as util from '../../store/reducers/utility'


class EditData extends React.Component {

  state = {
    question: false,
    data: false,
    cancel: false,
    form: {
            email: {
            elemenType: "input",
            elementConfig: {
              type: "email",
              placeholder: "Email:",
              disabled: true
            },
            value: "",
            isValid: true,
            touched: true,
            validationRules: {
              isRequired: true,
              minLenght: 8,
              regExp: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            },
            isInvalidMessage: "Is is not valid email address!",
            label: "Email address: "
          },
          name: {
            elemenType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Name: "
            },
            value: "",
            label: "Your name:",
            isValid: true,
            touched: true,
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
            isValid: true,
            touched: true,
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
            isValid: true,
            touched: true,
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
            isValid: true,
            touched: true,
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
            isValid: true,
            touched: true,
            isInvalidMessage:
              " This field is reguired.",
            validationRules: {
              isRequired: true,
              minLenght: 2,
            }
          },

    }
  }

  componentDidMount(){
    this.props.fetchUserData(this.props.userToken, this.props.userId)
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.userData !== prevProps.userData) {
    const copy = util.copy_state(this.state.form)

    //console.log('copy', copy)

    Object.keys(copy).forEach((key)=>{
      this.state.form[key].value = this.props.userData[key]
    })

    this.setState({form: copy})

  }
}

changeData =(data)=>{
  if(this.props.data!==this.props.userData){
    this.setState({question: true, data: data})
  }
}

sendChange=()=>{
  //console.log('Zmieniam')
  this.props.changeHandler(this.state.data, this.props.userId, this.props.userToken, this.props.databaseId)
  this.setState({question: false})
}

hideQuestion=()=>{
  //Cancel changes
  //console.log('Czemu nie zmieniam', this.props.userData, 'nowy state', copy)
  this.setState({question: false, cancel: !this.state.cancel})
}

  render(){

    return ( <Aux>
            {this.props.loading ? <Spinner/>
            : <SmartForm form={this.state.form} isValid sendButtonText = 'Change' sendHandler = {this.changeData} cancel={this.state.cancel}/>
            }
            {this.state.question ?
                                (<Modal>
                                  <Aux>
                                    Your personal data will be changed. Would youlike to proceed?
                                    <Question doThis = {this.sendChange} dontDoThis={this.hideQuestion}/>
                                  </Aux>
                                  </Modal>)
                                : null}
        </Aux>
            )
    }
};

const mapStateToProps = state => {
  return{
    userId: state.userId,
    userToken: state.userToken,
    databaseId: state.databaseId,
    userData: state.userData,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    changeHandler: (data, userId, userToken, databaseId)=>{
      //console.log('DATA', data)
      return dispatch({type: actionTypes.CHANGE_START, data: data, userId: userId, userToken: userToken, databaseId: databaseId})
    },
    fetchUserData: (token, id)=>dispatch({type: actionTypes.RETRIEVE_DATA_START, userId: id, userToken: token})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditData);
