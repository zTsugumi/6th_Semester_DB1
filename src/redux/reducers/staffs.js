import * as ActionTypes from '../actions/ActionTypes';

const staffs = (state = { isLoading: true, errMess: null, staffs: [] }, action) => {
    switch (action.type) {
        case ActionTypes.STAFFS_LOADING:
            return { ...state, isLoading: true, errMess: null, staffs: [] }
        case ActionTypes.ADD_STAFFS:
            return { ...state, isLoading: false, errMess: null, staffs: action.payload }
        case ActionTypes.ADD_STAFFS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, staffs: [] }

        case ActionTypes.POST_STAFFS_SUCCESS:
            var staff = action.payload;
            return { ...state, isLoading: false, staffs: state.staffs.concat(staff) };
        case ActionTypes.POST_STAFFS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        case ActionTypes.REMOVE_STAFFS_SUCCESS:
            return { ...state, isLoading: false, staffs: [] };
        case ActionTypes.REMOVE_STAFFS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        case ActionTypes.UPDATE_STAFF_SUCCESS:
            staff = action.payload;
            var newStaffs = state.staffs.map((item) => {
                if (item._id === staff._id)
                    return staff
                else
                    return item
            })
            return { ...state, isLoading: false, staffs: newStaffs };
        case ActionTypes.PUT_STAFF_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        case ActionTypes.REMOVE_STAFF_SUCCESS:
            var staffId = action.payload;
            return { ...state, isLoading: false, staffs: state.staffs.filter((staff) => staff._id !== staffId) };
        case ActionTypes.REMOVE_STAFF_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
}

export default staffs;