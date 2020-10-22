import * as types from './actionTypes';

export const logout = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: types.LOGOUT_SUCCESS });
			});
	};
};

export const afterLogin = (authResult) => {
	return (dispatch, getState, { getFirestore }) => {
		// Sign up
		if (authResult.additionalUserInfo.isNewUser) {
			const { displayName } = authResult.user;

			const [firstName, lastName] = displayName.split(' ');

			const firestore = getFirestore();

			firestore
				.collection('users')
				.doc(authResult.user.uid)
				.set({
					firstName,
					lastName,
					initials: firstName[0] + lastName[0],
				})
				.then(() => dispatch({ type: types.SIGNUP_SUCCESS }))
				.catch((err) => dispatch({ type: types.SIGNUP_ERROR, error: err.message }));
		}
		// Login
		else {
			dispatch({ type: types.LOGIN_SUCCESS });
		}
	};
};

export const afterFailedLogin = (error) => {
	return (dispatch) => {
		dispatch({ type: types.LOGIN_ERROR, error });
	};
};
