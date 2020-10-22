import React from 'react';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import Spinner from '../common/Spinner';

const AuthIsLoaded = ({ children, ...props }) => {
	const { auth } = props;

	if (!isLoaded(auth)) return <Spinner />;

	return children;
};

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
	};
};

export default connect(mapStateToProps)(AuthIsLoaded);
