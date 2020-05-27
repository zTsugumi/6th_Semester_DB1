import * as ActionTypes from '../actions/ActionTypes';

const files = (state = { errMess: null, files: null }, action) => {
    switch (action.type) {       
        case ActionTypes.POST_FILE_FAILED:
            return { ...state, errMess: action.payload, files: null };

        default:
            return state;
    }
}

export default files;