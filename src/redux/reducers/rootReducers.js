import auth from './auth';
import dishes from './dishes';
import staffs from './staffs';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
    auth,
    dishes,
    staffs
});

export default rootReducers;