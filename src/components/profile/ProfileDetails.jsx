import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from 'react-redux-firebase';
import AdminPanel from './../auth/AdminPanel';

function ProfileDetails(props) {
	const profile = useSelector((state) => state.firebase.profile);

	useEffect(() => {
		if (!isEmpty(profile) && profile.nickname !== 'undefined' && profile.age !== 'undefined') {
			localStorage.setItem('nickname', profile.nickname);
			localStorage.setItem('age', profile.age);
		}
	}, [profile]);

	let lastNickname = '';
	let lastAge = '';
	if (!navigator.onLine) {
		lastNickname = localStorage.getItem('nickname');
		lastAge = localStorage.getItem('age');
	}

	return (
		<div className='white'>
			<div className='row'>
				<div className='col s12 m8'>
					<h2 className='grey-text text-darken-3'>My Profile</h2>
					<h4>Nickname:</h4>
					<h5>{!isEmpty(profile) ? profile.nickname : lastNickname}</h5>
					<h4>Age:</h4>
					<h5>{!isEmpty(profile) ? profile.age : lastAge}</h5>
					<div className='input-field'>
						<Link to='/app/profile/edit'>
							<button className='btn pink lighten-1 z-depth-0 waves-effect waves-light'>Edit</button>
						</Link>
					</div>
				</div>
				<div className='col s12 m4'>
					<AdminPanel />
				</div>
			</div>
		</div>
	);
}

export default ProfileDetails;
