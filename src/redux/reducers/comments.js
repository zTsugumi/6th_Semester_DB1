import * as ActionTypes from '../actions/ActionTypes';

const comments = (state = { isLoading: true, errMess: null, comments: [] }, action) => {
    switch (action.type) {
        case ActionTypes.COMMENTS_LOADING:
            return { ...state, isLoading: true, errMess: null, comments: [] }
        case ActionTypes.ADD_COMMENTS:
            return { ...state, isLoading: false, errMess: null, comments: action.payload };
        case ActionTypes.ADD_COMMENTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, comments: [] };

        case ActionTypes.POST_COMMENTS_SUCCESS:
            var comment = action.payload;
            return { ...state, isLoading: false, comments: state.comments.concat(comment) };
        case ActionTypes.POST_COMMENTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
}

export default comments;