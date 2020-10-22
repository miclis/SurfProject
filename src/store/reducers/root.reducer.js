import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './auth.reducer';

const { combineReducers } = require('redux');

const rootReducer = combineReducers({
	auth: authReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
});

export default rootReducer;
