import * as types from '../actions/actionTypes';

const initState = {
	profileError: null,
};

const profileReducer = (state = initState, action) => {
	switch (action.type) {
		case types.EDIT_SUCCESS:
			return { ...state, profileError: null };
		case types.EDIT_ERROR:
			return { ...state, profileError: action.error };
		default:
			return state;
	}
};

export default profileReducer;
