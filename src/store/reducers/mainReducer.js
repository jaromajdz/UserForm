import actionTypes from '../actions/'

import {updateObject} from './utility.js'

const initialState = {
  userToken: null,
  userId: null,
  databaseId: null,
  error: false,
  loading: false,
  errMessage: null,
  userData: null
}

const authReducer = (state=initialState, action)=>{

    let newValue = false

    switch (action.type) {
      case actionTypes.AUTH_START: newValue = fetchStart(); break;
      case actionTypes.AUTH_SUCCESS: newValue = authSuccess(action.payload);break;
      case actionTypes.SET_LOG_IN: newValue = setLogIn(action.userToken, action.userId); break;
      case actionTypes.RETRIEVE_DATA_SUCCESS: newValue = userDataEdit(action.userData); break;
      case actionTypes.PATCH_DATA_SUCCESS: newValue = patchSuccess(action.userData); break;
      case actionTypes.FETCH_FAIL: newValue = fetchFail(action);break;
      case actionTypes.AUTH_LOGOUT: newValue = authLogout();break;
      case actionTypes.ERROR_RESET: newValue = {error: false, errMessage: null}; break;
    }
    //console.log('REDUCER Action', action ,'New value', newValue)

    return (newValue ? updateObject(state, newValue) : state)

}

const patchSuccess = (data)=>{
  return {
    userData: data
  }
}

const setLogIn=(token, id)=>{
  return {
    userToken: token,
    userId: id
  }
}

const userDataEdit=(data)=>{
  //console.log('Do dupy to wszysto', data)
  let keey
  let user = Object.keys(data).map(key=>{
    keey = key
    return data[key]
  });

  return {
    userData: user[0],
    databaseId: keey,
    loading: false
  }
}

const fetchStart=()=>{
  return {
      loading: true
    }

}

const authSuccess = (data) =>{
  //console.log('data', data)
  return {
    loading: false,
    userToken: data.idToken,
    userId: data.localId,
    }
  }

const fetchFail=(ac)=>{
  //console.log('FA?ILLLL', ac.error)
    return {
      loading: false,
      error: true,
      errMessage: ac.error.replace(/\_/g, ' ')
    }
}

const authLogout = ()=>{
  //console.log('zostalem wylogowany')
  return {
    userToken: null,
    userId: null,
    }
}


export default authReducer;
