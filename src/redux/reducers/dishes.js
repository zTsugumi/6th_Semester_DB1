import * as ActionTypes from '../actions/ActionTypes';

const dishes = (state = { isLoading: true, errMess: null, dishes: [] }, action) => {
    switch (action.type) {
        case ActionTypes.DISHES_LOADING:
            return { ...state, isLoading: true, errMess: null, dishes: [] }
        case ActionTypes.ADD_DISHES:
            return { ...state, isLoading: false, errMess: null, dishes: action.payload }
        case ActionTypes.ADD_DISHES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, dishes: [] }

        case ActionTypes.POST_DISHES_SUCCESS:
            var dish = action.payload;
            return { ...state, isLoading: false, dishes: state.dishes.concat(dish) };
        case ActionTypes.POST_DISHES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        case ActionTypes.REMOVE_DISHES_SUCCESS:
            return { ...state, isLoading: false, dishes: [] };
        case ActionTypes.REMOVE_DISHES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        case ActionTypes.UPDATE_DISH_SUCCESS:
            dish = action.payload;
            var newDishes = state.dishes.map((item) => {
                if (item._id === dish._id)
                    return dish
                else
                    return item
            })
            return { ...state, isLoading: false, dishes: newDishes };
        case ActionTypes.PUT_DISH_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        case ActionTypes.REMOVE_DISH_SUCCESS:
            var dishId = action.payload;
            return { ...state, isLoading: false, dishes: state.dishes.filter((dish) => dish._id !== dishId) };
        case ActionTypes.REMOVE_DISH_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
}

export default dishes;