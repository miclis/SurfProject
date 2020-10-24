import React from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/auth.actions';
import './Main.css';
import Header from './Header';
import MyLessonsList from './../mylessons/MyLessonsList';
import { Redirect, Switch } from 'react-router-dom';
import PrivateRoute from '../auth/PrivateRoute';
import { auth } from 'firebase';
import { WaitingComponent } from '../common/Spinner';

const AddLesson = React.lazy(() => import('../trainer/AddLesson'));
const EditProfileDetails = React.lazy(() => import('../profile/EditProfileDetails'));
const ProfileDetails = React.lazy(() => import('../profile/ProfileDetails'));

function Main() {
	return (
		<>
			<Header />
			<main>
				<div className='section'>
					<div id='mainContent' className='container'>
						<Switch>
							<PrivateRoute path='/app' exact component={MyLessonsList} />
							<PrivateRoute path='/app/add' exact component={WaitingComponent(AddLesson)} auth={auth} />
							<PrivateRoute
								path='/app/profile/edit'
								component={WaitingComponent(EditProfileDetails)}
								auth={auth}
							/>
							<PrivateRoute
								path='/app/profile'
								exact
								component={WaitingComponent(ProfileDetails)}
								auth={auth}
							/>
							<Redirect to='/' />
						</Switch>
					</div>
				</div>
			</main>
		</>
	);
}

const mapDispatchToProps = {
	logout: authActions.logout,
};

export default connect(null, mapDispatchToProps)(Main);
