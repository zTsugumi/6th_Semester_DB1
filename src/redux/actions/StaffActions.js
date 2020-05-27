import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

/******************************************************* GET STAFFS *******************************************************/
const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
});

const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});

const addStaffsFailed = (errmess) => ({
    type: ActionTypes.ADD_STAFFS_FAILED,
    payload: errmess
});

// This is a thunk :)
const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading());

    return fetch(baseUrl + 'staffs')
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
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(error => dispatch(addStaffsFailed(error.message)));
};

/******************************************************** POST STAFFS *******************************************************/
const postStaff = (staff) => ({
    type: ActionTypes.POST_STAFFS_SUCCESS,
    payload: staff
});

const postStaffsFailed = (errmess) => ({
    type: ActionTypes.POST_STAFFS_FAILED,
    payload: errmess
})

const postStaffs = (newStaff) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'staffs', {
        method: "POST",
        body: JSON.stringify(newStaff),
        headers: {
            "Content-Type": "application/json",
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
        .then(staff => dispatch(postStaff(staff)))
        .catch(error => dispatch(postStaffsFailed(error.message)));
};


/******************************************************* DELETE STAFFS *******************************************************/
const removeStaffs = () => ({
    type: ActionTypes.REMOVE_STAFFS_SUCCESS
})

const removeStaffsFailed = (errmess) => ({
    type: ActionTypes.REMOVE_STAFFS_FAILED,
    payload: errmess
})

const deleteStaffs = () => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'staffs', {
        method: "DELETE",
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
        .then(() => dispatch(removeStaffs()))
        .catch(error => dispatch(removeStaffsFailed(error.message)));
};

/********************************************************* PUT STAFF ********************************************************/
const updateStaff = (staff) => ({
    type: ActionTypes.UPDATE_STAFF_SUCCESS,
    payload: staff
});

const putStaffFailed = (errmess) => ({
    type: ActionTypes.PUT_STAFF_FAILED,
    payload: errmess
})

const putStaff = (staffId, updateInfo) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(`${baseUrl}staffs/${staffId}`, {
        method: 'PUT',
        body: JSON.stringify(updateInfo),
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
        .then(response => response.json())
        .then(updatedStaff => dispatch(updateStaff(updatedStaff)))
        .catch(error => dispatch(putStaffFailed(error.message)));
}

/******************************************************** DELETE STAFF ******************************************************/
const removeStaff = (staffId) => ({
    type: ActionTypes.REMOVE_STAFF_SUCCESS,
    payload: staffId
})

const removeStaffFailed = (errmess) => ({
    type: ActionTypes.REMOVE_STAFF_FAILED,
    payload: errmess
})

const deleteStaff = (staffId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'staffs/' + staffId, {
        method: "DELETE",
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
        .then(() => dispatch(removeStaff(staffId)))
        .catch(error => dispatch(removeStaffFailed(error.message)));
};

export default {
    fetchStaffs,
    postStaffs,
    deleteStaffs,
    putStaff,
    deleteStaff
}