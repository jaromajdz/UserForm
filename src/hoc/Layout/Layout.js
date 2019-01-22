  import React, { Component } from 'react';

  import style from './Layout.css'
  import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
  import Aux from '../Aux/Aux'
  import {connect} from 'react-redux';

  class Layout extends Component {

      render(){
        return <Aux>

                <Toolbar isAuth = {this.props.isAuthenticated}/>

                <main className={style.Content}>
                  {this.props.children}
                </main>
             </Aux>
      }
  }

const mapStateToProps =  state =>{
  return{
    isAuthenticated: state.userToken ? true : false
  }
}

export default connect(mapStateToProps, null)(Layout);
