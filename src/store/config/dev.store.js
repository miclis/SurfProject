import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import rootReducer from '../reducers/root.reducer';
import firebase from './fbConfig';

import { getFirestore, reduxFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase }, reduxImmutableStateInvariant())),
			reduxFirestore(firebase),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	);
}
