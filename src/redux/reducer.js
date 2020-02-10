import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { photosReducer } from './photos';
import { userReducer } from './user';

const rootReducer =  combineReducers({
    authReducer,
    photosReducer,
    userReducer
})

export { rootReducer }