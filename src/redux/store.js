import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { photosReducer } from './photos';
import { userReducer } from './user';

const rootReducer =  combineReducers({
    authReducer,
    photosReducer,
    userReducer
})

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(thunk)))

export { store }
