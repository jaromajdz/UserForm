import actionTypes from '../actions/authActions'
import {updateObject} from './utility.js'
import authReducer from './mainReducer'


const initialState = {
  userToken: null,
  userId: null,
  error: false,
  loading: false,
  errMessage: null,
  userData: null
}

const action = {
  type: actionTypes.RETRIEVE_DATA_SUCCESS,
  userData: {'dupa': 'blada'}
}

const state = authReducer(initialState, action)

test('React reducer RETRIEVE_DATA_SUCCESS',
  ()=>{
    expect(state).toEqual({
      userToken: null,
      userId: null,
      error: false,
      loading: false,
      errMessage: null,
      userData: { 'dupa': 'blada'}
    })
  }

);
