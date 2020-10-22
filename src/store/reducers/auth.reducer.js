import * as types from '../actions/actionTypes';

const initState = {
	authenticationError: null,
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case types.LOGIN_SUCCESS:
			console.log('Login success');
			return { ...state, authenticationError: null };
		case types.LOGIN_ERROR:
			console.log('Login error');
			return { ...state, authenticationError: action.error };
		case types.LOGOUT_SUCCESS:
			console.log('Logout success');
			return state;
		case types.SIGNUP_SUCCESS:
			console.log('Signup success');
			return state;
		case types.SIGNUP_ERROR:
			console.log('Signup error');
			return { ...state, authenticationError: action.error };
		default:
			return state;
	}
};

export default authReducer;
