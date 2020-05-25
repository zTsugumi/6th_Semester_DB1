import * as ActionTypes from '../actions/ActionTypes';

const reservations = (state = { isLoading: true, errMess: null, reservations: null }, action) => {
    switch (action.type) {
        case ActionTypes.RESERVATIONS_LOADING:
            return { ...state, isLoading: true, errMess: null, reservations: null };

        case ActionTypes.ADD_RESERVATIONS:
            return { ...state, isLoading: false, errMess: null, reservations: action.payload };

        case ActionTypes.RESERVATIONS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, reservations: null };

        case ActionTypes.POST_RESERVATION_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
}

export default reservations;