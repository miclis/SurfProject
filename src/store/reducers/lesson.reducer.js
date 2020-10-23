import * as types from '../actions/actionTypes';

const initState = {
	lessonError: null,
};

const lessonReducer = (state = initState, action) => {
	switch (action.type) {
		case types.ADD_LESSON_SUCCESS:
			return { ...state, lessonError: null };
		case types.ADD_LESSON_ERROR:
			return { ...state, lessonError: action.error };
		case types.DELETE_LESSON_ERROR:
			return { ...state, lessonError: action.error };
		case types.DELETE_LESSON_SUCCESSS:
			return { ...state, lessonerror: null };
		default:
			return state;
	}
};

export default lessonReducer;
