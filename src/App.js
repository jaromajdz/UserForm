import React, { Component } from 'react';

import {Route, Switch} from 'react-router-dom';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';

import style from './App.css';

import Layout from './hoc/Layout/Layout'
import actionTypes from './store/actions/authActions'

import Auth from './components/Auth/Auth'
import Logout from './components/Auth/Logout/Logout'
import SingUpForm from './components/SignUpForm/SignUpForm'
import EditData from './components/EditData/EditData'
import Modal from './components/UI/Modal/Modal'

class App extends Component {

  componentDidMount(){
    this.props.checkLoginCredentials();
  }


  render() {
      return (
        <div>
          <Layout>
          <Switch>
              <Route path="/auth" component={Auth}/>
              <Route path="/singupform" component={SingUpForm}/>
              <Route path="/editdata" component={EditData}/>
          </Switch>
          </Layout>
        <Route path="/logout" component={Logout}/>
        {this.props.error ?  <Modal closeModal = {this.props.closeModal} >{this.props.errMessage}</Modal> : null}
      </div>
    );
  }
}

const mapStateToProps = state =>{
  //console.log('errrrr', state.error, state.errMessage)
  return {
    error: state.error,
    errMessage: state.errMessage
  }
}

const mapDispatchToProps = dispatch=>{
  console.log('closeModal')
 return {
     closeModal: ()=>dispatch({type: actionTypes.ERROR_RESET}),
     checkLoginCredentials: ()=>dispatch({type: actionTypes.CHECK_LOGGED_IN})
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
