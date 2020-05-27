import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

/******************************************************* GET COMMENTS *******************************************************/
const commentsLoading = () => ({
    type: ActionTypes.COMMENTS_LOADING
});

const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

const addCommentsFailed = (errmess) => ({
    type: ActionTypes.ADD_COMMENTS_FAILED,
    payload: errmess
});

const fetchComments = () => (dispatch) => {
    dispatch(commentsLoading());

    return fetch(baseUrl + 'comments')
        .then(
            response => {           // Promise resolve
                if (response.ok) {  // Server responses ok [200...299]
                    return response
                }
                else {              // Server responses errer [300...400]
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {              // Promise rejected
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(addCommentsFailed(error.message)));
};

/******************************************************* POST COMMENTS ******************************************************/
const postComment = (comment) => ({
    type: ActionTypes.POST_COMMENT,
    payload: comment
});

const postCommentsFailed = (errmess) => ({
    type: ActionTypes.POST_COMMENTS_FAILED,
    payload: errmess
})

const postComments = (newComment) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(
            response => {           // Promise resolve
                if (response.ok) {  // Server responses ok [200...299]
                    return response;
                }
                else {              // Server responses errer [300...400]
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {              // Promise rejected
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())      // After post, new comment will be returned back as response
        .then(newComment => dispatch(postComment(newComment)))
        .catch(error => dispatch(postCommentsFailed(error.message)));
}

export default {
    fetchComments,
    postComments
}