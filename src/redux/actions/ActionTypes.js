/******************************************************** GET DISHES ********************************************************/
export const DISHES_LOADING = 'DISHES_LOADING';
export const ADD_DISHES = 'ADD_DISHES';                     // Add dishes to view ~ Add new dishes to Redux store
export const ADD_DISHES_FAILED = 'ADD_DISHES_FAILED';       // Add dishes to view failed, it's triggered when fetch failed

/******************************************************* POST DISHES ********************************************************/
export const POST_DISH = 'POST_DISH';                       // Post new dish to view ~ Add new dish to Redux store
export const POST_DISHES_FAILED = 'POST_DISHES_FAILED';     // Post new dish to db failed, it's triggered when fetch post failed

/****************************************************** DELETE DISHES *******************************************************/
export const REMOVE_DISHES_SUCCESS = 'REMOVE_DISHES_SUCCESS';
export const REMOVE_DISHES_FAILED = 'REMOVE_DISHES_FAILED';

/******************************************************** PUT DISH **********************************************************/
export const UPDATE_DISH = 'UPDATE_DISH';                   // Update view ~ Change Redux store with updated dish
export const PUT_DISH_FAILED = 'PUT_DISH_FAILED';           // Update dish to db failed, it's triggered when fetch put failed

/******************************************************* DELETE DISH ********************************************************/
export const REMOVE_DISH_SUCCESS = 'REMOVE_DISH_SUCCESS';   // Remove dish from view ~ Change Redux store
export const REMOVE_DISH_FAILED = 'REMOVE_DISH_FAILED';

/******************************************************* GET COMMENTS *******************************************************/
export const COMMENTS_LOADING = 'COMMENT_LOADING';
export const ADD_COMMENTS = 'ADD_COMMENTS';                 // Add comments to view ~ Add new comments to Redux store
export const ADD_COMMENTS_FAILED = 'COMMENTS_FAILED';       // Add comments to view failed, it's triggered when fetch failed

/******************************************************* POST COMMENTS ******************************************************/
export const POST_COMMENT = 'POST_COMMENT';                 // Post new comment to view ~ Add new comment to Redux store
export const POST_COMMENTS_FAILED = 'POST_COMMENT_FAILED';  // Post new comment to db failed, it's triggered when fetch post failed

/******************************************************** GET STAFFS ********************************************************/
export const STAFFS_LOADING = 'STAFFS_LOADING';
export const ADD_STAFFS = 'ADD_STAFFS';                     // Add staffs to view ~ Add new staffs to Redux store
export const ADD_STAFFS_FAILED = 'STAFFS_FAILED';           // Add staffs to view failed, it's triggered when fetch failed

/***************************************************** GET RESERVATIONS *****************************************************/
export const RESERVATIONS_LOADING = 'RESERVATIONS_LOADING';
export const ADD_RESERVATIONS = 'ADD_RESERVATIONS';         // Add reservations to view ~ Add new reservations to Redux store
export const RESERVATIONS_FAILED = 'RESERVATIONS_FAILED';   // Add reservations to view failed, it's triggered when fetch failed

/***************************************************** POST RESERVATION *****************************************************/
export const POST_RESERVATION_FAILED =                      // Post new reservation to db failed, it's triggered when fetch post failed
    'POST_RESERVATION_FAILED';                              // Here we don't have POST_RESERVATION to add new reservation to view because
// from server responses all reservations, not just the one we just post

/***************************************************** POST RESERVATION *****************************************************/
export const FAVORITES_LOADING = 'FAVORITES_LOADING';
export const ADD_FAVORITES = 'ADD_FAVORITES';               // Add favorites to view ~ Add new favorites to Redux store
export const FAVORITES_FAILED = 'FAVORITES_FAILED';         // Add favorites to view failed, it's triggered when fetch failed
// Here we don't handle post failed, because it's hard to happen)

/******************************************************** POST FILE *********************************************************/
export const POST_FILE_FAILED = 'POST_FILE_FAILED';         // Post new file to db failed, it's triggered when fetch post failed

/******************************************************* AUTHORIZATION ******************************************************/
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const SIGNUP_REQUEST = 'LOGIN_REQUEST';
export const SIGNUP_SUCCESS = 'LOGIN_SUCCESS';
export const SIGNUP_FAILURE = 'LOGIN_FAILURE';

export const CHECK_JWT = 'CHECK_JWT';                       // WIP