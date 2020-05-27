import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

/****************************************************** POST FILE ******************************************************/
const postFileFailed = (errmess) => ({
    type: ActionTypes.POST_FILE_FAILED,
    payload: errmess
});

const postFile = (file) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    const formData = new FormData();
    formData.append('imageFile', file);

    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    return fetch(baseUrl + 'imageUpload', {
        method: "POST",
        body: formData,
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .catch(error => dispatch(postFileFailed(error.message)));
};

export default {
    postFile
}