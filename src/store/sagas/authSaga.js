import actionTypes from '../actions/';
import { call, put, takeLatest, takeEvery, select} from 'redux-saga/effects';
import { delay } from 'redux-saga'

import axios from 'axios';

function* authSaga(action){

  const authData = {
    email: action.data.email,
    password: action.data.password,
    returnSecureToken: true
  }

  try {
      yield put({type: actionTypes.AUTH_START});
      const res = yield axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyASIkw2iDDNYSWbhH54XBIZaKQfgGMs3fQ'
              , authData)
      yield put({type: actionTypes.AUTH_SUCCESS, payload: res.data});
      yield put ({type: actionTypes.TIME_OUT, timeOut: res.data.expiresIn, history: action.history});
      const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
      yield localStorage.setItem('authToken', res.data.idToken)
      yield localStorage.setItem('expirationDate', expirationDate)
      yield localStorage.setItem('userId', res.data.localId)
      //yield console.log('LOG in', res.data)
      yield authRedirectSaga(action.history);
    } catch (err) {

        yield put({type: actionTypes.FETCH_FAIL, error: err.response.data.error.message})
  }

}

function* authRedirectSaga(history){
    yield put({type: actionTypes.FETCH_FAIL, error: "You are logged in!"})
    yield delay(1300);
    yield put({type: actionTypes.ERROR_RESET})
    yield history.push('/');
}

function* logOutSaga(action){
 if(action.logged){
      yield put({type: actionTypes.AUTH_LOGOUT})
      yield localStorage.removeItem('authToken')
      yield localStorage.removeItem('expirationDate')
      yield localStorage.removeItem('userId')
      yield put({type: actionTypes.FETCH_FAIL, error: "You have been logged out!"})
      yield delay(1300);
      yield put({type: actionTypes.ERROR_RESET})
      yield action.history.replace('/');
    }
  }


function* timeOutSaga(action){
        yield delay((action.timeOut - 1400) * 1000)
        yield put({type: actionTypes.FETCH_FAIL, error: "You have been logged out!"})
        yield delay(1300)
        yield put({type: actionTypes.AUTH_LOGOUT})
        yield localStorage.removeItem('authToken')
        yield localStorage.removeItem('expirationDate')
        yield localStorage.removeItem('userId')
        yield put({type: actionTypes.ERROR_RESET})
        yield action.history.replace('/');
}

function* checkLogInSaga(action){
   const authToken = localStorage.getItem('authToken')
   if(!authToken){
     //console.log('Auth Toke pusty')
   }else{
     const userId = localStorage.getItem('userId')
     const expirationTime = parseInt(((new Date(localStorage.getItem('expirationDate'))).getTime() - (new Date()).getTime())/1000)
     //console.log('Auth token jest !', expirationTime)
     if(expirationTime>0){
       yield put({type: actionTypes.SET_LOG_IN, userToken: authToken, userId: userId })
     }

   }

}

function* rootSaga(){
  /*
  yield takeEvery('*', function* logger(action) {
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  }) */
  yield takeEvery(actionTypes.CHECK_LOGGED_IN, checkLogInSaga)
  yield takeEvery(actionTypes.TIME_OUT, timeOutSaga);
  yield takeEvery(actionTypes.AUTH_LOGOUT_START, logOutSaga);
  yield takeLatest(actionTypes.AUTH_ACTION, authSaga);

}

export default rootSaga;
