import { combineReducers } from 'redux';
import { templateReducer } from './templateReducer';
import { authReducer } from './auth';

const rootReducer =  combineReducers({
    templateReducer,
    authReducer
})

export { rootReducer }