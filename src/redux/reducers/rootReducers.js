import auth from './auth';
import dishes from './dishes';
import comments from './comments';
import staffs from './staffs';
import reservations from './reservations';
import favorites from './favorites';
import { combineReducers } from 'redux';
import { createForms } from 'react-redux-form';
import { InitialReservation } from '../form';

// Reducer
// Note that reducer is a pure function, it means that it should not 
// mutate state, in other word, the previous state should not be changed by any means
const rootReducers = combineReducers({
    auth,
    dishes,
    comments,
    staffs,
    reservations,
    favorites,
    ...createForms({
        reservation: InitialReservation
    })
});

export default rootReducers;