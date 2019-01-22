import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {BrowserRouter} from 'react-router-dom';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import * as serviceWorker from './serviceWorker';

import mainReducer from './store/reducers/mainReducer'
import authSaga from './store/sagas/authSaga'
import singUpSaga from './store/sagas/singUpSaga'

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

const mainStore = createStore(mainReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(singUpSaga)
sagaMiddleware.run(authSaga)


ReactDOM.render(<Provider store={mainStore}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
