import AuthActions from './AuthActions';
import DishActions from './DishActions';
import CommentActions from './CommentActions';
import StaffActions from './StaffActions';
import ReservationActions from './ReservationActions';

// Action is a function that create an action object 
// The view will trigger the action, which then be sent to reducer to update store
//      type: get from ActionTypes
//      payload: the data that needs to be carried in the action object to the reducer
const AllActions = {
    AuthActions,
    DishActions,
    CommentActions,
    StaffActions,
    ReservationActions
}

export default AllActions;
