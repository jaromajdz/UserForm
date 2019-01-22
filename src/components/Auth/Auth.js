  import React, { Component } from 'react';
  import {connect} from 'react-redux';
  import { withRouter } from 'react-router';

  import style from './Auth.css'

  import SmartForm from '../SmartForm/SmartForm'


  import ac from '../../store/actions/authActions';

  class Auth extends Component {

      authWithHistory = (data) =>{
        this.props.authStart(data, this.props.history)
      }

      render(){
          return <div className={style.Auth}><SmartForm sendHandler = {this.authWithHistory} /></div>
      }
  }

  const mapDispatchToProps = dispatch => {
    return {
      authStart:(data, history)=>{
            return dispatch({type: ac.AUTH_ACTION, data: data, history: history })
      },
    };
  }

export default connect(null, mapDispatchToProps)(Auth);

//export default withRouter(connect(null, mapDispatchToProps)(Auth));
