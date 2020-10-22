import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { PropTypes } from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const auth = useSelector((state) => state.firebase.auth);

	return (
		<Route
			{...rest}
			render={(props) =>
				isLoaded(auth) && !isEmpty(auth) ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/', state: { from: props.location } }} />
				)
			}
		/>
	);
};

PrivateRoute.propTypes = {
	component: PropTypes.elementType.isRequired,
	location: PropTypes.object,
};

export default PrivateRoute;
