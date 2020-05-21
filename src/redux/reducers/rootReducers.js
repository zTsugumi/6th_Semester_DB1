import auth from './auth';
import dishes from './dishes';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
    auth,
    dishes
});

export default rootReducers;