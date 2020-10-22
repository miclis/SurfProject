import * as types from './actionTypes';

export const editProfile = (profileData) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// make async call to database
		const firestore = getFirestore();
		const uid = getState().firebase.auth.uid;

		firestore
			.collection('users')
			.doc(uid)
			.update({ age: profileData.newAge, nickname: profileData.newNickname })
			.then(() => dispatch({ type: types.EDIT_SUCCESS }))
			.catch((err) => dispatch({ type: types.EDIT_ERROR, err }));
	};
};
