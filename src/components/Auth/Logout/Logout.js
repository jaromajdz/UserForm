  import React, { Component } from 'react';
  import actionTypes from '../../../store/actions/authActions';
  import { Redirect } from 'react-router-dom';
  import { connect } from 'react-redux';


  class  Logout extends Component {

      componentDidMount(){
          this.props.onLogout(this.props.history, this.props.isLogged);
      }

      render(){
        //return (<Redirect to="/" />);
        return <div></div>
      }
  }

const mapStateToProps = state =>{
  return {
    isLogged: state.userToken ? true : false
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: (history, logged)=>dispatch({type: actionTypes.AUTH_LOGOUT_START, history: history, logged: logged})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
