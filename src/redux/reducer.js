import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { photosReducer } from './photos';

const rootReducer =  combineReducers({
    authReducer,
    photosReducer
})

export { rootReducer }