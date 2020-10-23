import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/auth.actions';

function LoginModal(props) {
	const firebase = useFirebase();

	// FirebaseUI
	const uiConfig = {
		// Popup signin flow rather than redirect flow.
		signInFlow: 'popup',
		// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
		signInSuccessUrl: '/app',
		// Auth Providers
		signInOptions: [
			{
				provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				customParameters: {
					// Forces account selection even when one account
					// is available.
					prompt: 'select_account',
				},
			},
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		],
		privacyPolicyUrl: '/privacy',
		tosUrl: '/tos',
		callbacks: {
			signInSuccessWithAuthResult: (authResult) => {
				props.toggleModal();
				props.afterLogin(authResult);
				return false;
			},
			signInFailure: (error) => {
				props.afterFailedLogin(error);
				return false;
			},
		},
	};

	return (
		<>
			<div className='row' onClick={props.toggleModal} style={{ marginBottom: 0 }}>
				<button className='btn-floating right white'>
					<i className='material-icons grey-text'>close</i>
				</button>
			</div>

			<div className='center' style={{ fontSize: '28px', textTransform: 'uppercase' }}>
				Get Started
			</div>
			<FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
		</>
	);
}

LoginModal.propTypes = {
	toggleModal: PropTypes.func.isRequired,
	afterLogin: PropTypes.func.isRequired,
	afterFailedLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
	afterLogin: authActions.afterLogin,
	afterFailedLogin: authActions.afterLogin,
};

export default connect(null, mapDispatchToProps)(LoginModal);
