import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';
import { createFirestoreInstance } from 'redux-firestore';

// Initilize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyC9YQfh5kdk-g2sXCHU5O1YGGxckGs5QyA',
	authDomain: 'dev-surfproject.firebaseapp.com',
	databaseURL: 'https://dev-surfproject.firebaseio.com',
	projectId: 'dev-surfproject',
	storageBucket: 'dev-surfproject.appspot.com',
	messagingSenderId: '976436472142',
	appId: '1:976436472142:web:68707ed04f8f4d18a3961f',
	measurementId: 'G-CC60LDXQQZ',
};

firebase.initializeApp(firebaseConfig);
firebase
	.firestore()
	.enablePersistence()
	.catch((err) => {
		console.log('Storage persistence is unavailable on the device...');
	});
firebase.functions();

export default firebase;

// Firebase configs
const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true,
	enableClaims: true,
};

export function rrfProps(store) {
	return {
		firebase,
		config: rrfConfig,
		useFirestoreForProfile: true,
		dispatch: store.dispatch,
		createFirestoreInstance,
	};
}
