import actionTypes from '../actions/';
import { call, put, takeLatest, takeEvery, select} from 'redux-saga/effects';
import { delay } from 'redux-saga'
import axios from 'axios'
/*
  Sagas man registration and change user data

*/
function* singUpSaga(action){

  let res
  const singUpData = { email: action.data.email, password: action.data.password, returnSecureToken: true }
  delete action.data.password
  delete action.data.password1
  let userData = {...action.data}

  try {
    yield put({type: actionTypes.AUTH_START});
    yield res = yield axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyASIkw2iDDNYSWbhH54XBIZaKQfgGMs3fQ"
            , singUpData);
    yield put({type: actionTypes.AUTH_SUCCESS, payload: res.data})
    yield userData['userId'] = res.data.localId
    // yield console.log('UserData', userData ,'Local ID',  res.data.localId)
    yield res = yield axios.post("https://ract-my-burger.firebaseio.com/users.json", userData)
    yield put({type: actionTypes.ADD_USER_DATA_SUCCESS})

  }catch (err){
    yield console.log('Errrr', err, err.response.data)
    yield put({type: actionTypes.FETCH_FAIL, error: err.response.data.error.message})
  }

}

function* changeDataSaga(action){
      //yield console.log('Change user id:', action.userId, 'Token:', action.userToken, 'Data: ', action.data  )
  let url = `https://ract-my-burger.firebaseio.com/users/${action.databaseId}/.json?auth=${action.userToken}`
  try {
      yield put({type: actionTypes.AUTH_START});
      const res = yield axios.patch(url, action.data);
      yield put({type: actionTypes.PATCH_DATA_SUCCESS, userData: res.data})
      yield put({type: actionTypes.FETCH_FAIL, error: 'Your personal data has changed!'})
      yield delay(1300)
      yield put({type: actionTypes.ERROR_RESET})
        }catch (err){
      yield put({type: actionTypes.FETCH_FAIL, error: err.response.data.error.message})
    }

}

function* pullDataSaga(action){
    let queryParams = `auth=${action.userToken}&orderBy="userId"&equalTo="${action.userId}"`
  try {
      yield put({type: actionTypes.AUTH_START});
      const res = yield axios.get("https://ract-my-burger.firebaseio.com/users.json?" + queryParams);
      yield put({type: actionTypes.RETRIEVE_DATA_SUCCESS, userData: res.data})
        }catch (err){
      yield put({type: actionTypes.FETCH_FAIL, error: err.response.data.error.message})
    }
}


function* singUpRootSaga(){
  yield takeLatest(actionTypes.CHANGE_START, changeDataSaga)
  yield takeEvery(actionTypes.SINGUP_START, singUpSaga);
  yield takeEvery(actionTypes.RETRIEVE_DATA_START, pullDataSaga);
  }

export default singUpRootSaga;
