import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

/******************************************************** GET DISHES ********************************************************/
const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

const addDishesFailed = (errmess) => ({
    type: ActionTypes.ADD_DISHES_FAILED,
    payload: errmess
});

// This is a thunk :)
const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());

    return fetch(baseUrl + 'dishes')
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
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(addDishesFailed(error.message)));
};

/******************************************************** POST DISHES *******************************************************/
const postDish = (dish) => ({
    type: ActionTypes.POST_DISHES_SUCCESS,
    payload: dish
});

const postDishesFailed = (errmess) => ({
    type: ActionTypes.POST_DISHES_FAILED,
    payload: errmess
})

const postDishes = (newDish) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'dishes', {
        method: "POST",
        body: JSON.stringify(newDish),
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
        .then(dish => dispatch(postDish(dish)))
        .catch(error => dispatch(postDishesFailed(error.message)));
};

/******************************************************* DELETE DISHES *******************************************************/
const removeDishes = () => ({
    type: ActionTypes.REMOVE_DISHES_SUCCESS
})

const removeDishesFailed = (errmess) => ({
    type: ActionTypes.REMOVE_DISHES_FAILED,
    payload: errmess
})

const deleteDishes = () => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'dishes', {
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
        .then(() => dispatch(removeDishes()))
        .catch(error => dispatch(removeDishesFailed(error.message)));
};

/********************************************************* PUT DISH *********************************************************/
const updateDish = (dish) => ({
    type: ActionTypes.UPDATE_DISH_SUCCESS,
    payload: dish
});

const putDishFailed = (errmess) => ({
    type: ActionTypes.PUT_DISH_FAILED,
    payload: errmess
})

const putDish = (dishId, updateInfo) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(`${baseUrl}dishes/${dishId}`, {
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
        .then(updatedDish => dispatch(updateDish(updatedDish)))
        .catch(error => dispatch(putDishFailed(error.message)));
}

/******************************************************* DELETE DISH ********************************************************/
const removeDish = (dishId) => ({
    type: ActionTypes.REMOVE_DISH_SUCCESS,
    payload: dishId
})

const removeDishFailed = (errmess) => ({
    type: ActionTypes.REMOVE_DISH_FAILED,
    payload: errmess
})

const deleteDish = (dishId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'dishes/' + dishId, {
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
        .then(() => dispatch(removeDish(dishId)))
        .catch(error => dispatch(removeDishFailed(error.message)));
};

export default {
    fetchDishes,
    postDishes,
    deleteDishes,
    putDish,
    deleteDish
}