import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ProfileDetails(props) {
	const profile = useSelector((state) => state.firebase.profile);
	console.log(profile);
	return (
		<div className='container white'>
			<div className='row'>
				<div className='col s12'></div>
				<h2 className='grey-text text-darken-3'>My Profile</h2>
				<h4>Nickname:</h4>
				<h5>{profile.nickname}</h5>
				<h4>Age:</h4>
				<h5>{profile.age}</h5>
				<div className='input-field'>
					<Link to='/app/profile/edit'>
						<button className='btn pink lighten-1 z-depth-0 waves-effect waves-light'>Edit</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ProfileDetails;
