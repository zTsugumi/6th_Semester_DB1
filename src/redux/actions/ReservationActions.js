import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

/******************************************************** RESERVATIONS ********************************************************/
export const reservationLoading = () => ({
    type: ActionTypes.RESERVATIONS_LOADING
});

export const addReservations = (reservations) => ({
    type: ActionTypes.ADD_RESERVATIONS,
    payload: reservations
});

export const reservationsFailed = (errmess) => ({
    type: ActionTypes.RESERVATIONS_FAILED,
    payload: errmess
});

export const fetchReservations = () => (dispatch) => {
    dispatch(reservationLoading());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'reservation', {
        headers: {            
            'Authorization': bearer
        },
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(reservations => dispatch(addReservations(reservations)))
        .catch(error => dispatch(reservationsFailed(error.message)));
};

const postReservationFailed = (errmess) => ({
    type: ActionTypes.POST_RESERVATION_FAILED,
    payload: errmess
})

const postReservation = (reservation) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'reservation', {
        method: 'POST',
        body: JSON.stringify(reservation),
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
        .then(reservations => dispatch(addReservations(reservations)))
        .catch(error => dispatch(postReservationFailed(error.message)));
}

export default {
    reservationLoading,
    addReservations,
    reservationsFailed,
    fetchReservations,
    postReservation,
    postReservationFailed
};