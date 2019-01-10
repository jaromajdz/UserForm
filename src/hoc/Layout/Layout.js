  import React, { Component } from 'react';
  import {Route, Switch} from 'react-router-dom';

  import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems'

  class Layout extends Component {

      render(){
        return <navbar>
                  <NavigationItems/>
                </navbar>
      }
  }
export default Layout;
