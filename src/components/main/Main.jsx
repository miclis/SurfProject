import React from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/auth.actions';
import './Main.css';
import Header from './Header';
import MyLessonsList from './../mylessons/MyLessonsList';
import { Redirect, Switch } from 'react-router-dom';
import PrivateRoute from '../auth/PrivateRoute';
import ProfileDetails from './../profile/ProfileDetails';
import { auth } from 'firebase';
import EditProfileDetails from '../profile/EditProfileDetails';
import AddLesson from './../trainer/AddLesson';

Main.propTypes = {};

function Main() {
	return (
		<>
			<Header />

			<div className='section'>
				<div id='mainContent' className='container'>
					<Switch>
						<PrivateRoute path='/app' exact component={MyLessonsList} />
						<PrivateRoute path='/app/add' exact component={AddLesson} auth={auth} />
						<PrivateRoute path='/app/profile/edit' component={EditProfileDetails} auth={auth} />
						<PrivateRoute path='/app/profile' exact component={ProfileDetails} auth={auth} />
						<Redirect to='/' />
					</Switch>
				</div>
			</div>
		</>
	);
}

const mapDispatchToProps = {
	logout: authActions.logout,
};

export default connect(null, mapDispatchToProps)(Main);
