import * as types from '../actions/actionTypes';

const initState = {
	authenticationError: null,
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case types.LOGIN_SUCCESS:
			return { ...state, authenticationError: null };
		case types.LOGIN_ERROR:
			return { ...state, authenticationError: action.error };
		case types.LOGOUT_SUCCESS:
			return state;
		case types.SIGNUP_SUCCESS:
			return state;
		case types.SIGNUP_ERROR:
			return { ...state, authenticationError: action.error };
		default:
			return state;
	}
};

export default authReducer;
