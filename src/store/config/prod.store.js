import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/root.reducer';
import firebase from './fbConfig';

import { getFirestore, reduxFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		compose(applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })), reduxFirestore(firebase))
	);
}
