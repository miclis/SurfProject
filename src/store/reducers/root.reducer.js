import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './auth.reducer';
import lessonReducer from './lesson.reducer';

const { combineReducers } = require('redux');

const rootReducer = combineReducers({
	auth: authReducer,
	lesson: lessonReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
});

export default rootReducer;
