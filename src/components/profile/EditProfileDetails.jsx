import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import * as profileActions from './../../store/actions/profile.actions';

function ProfileDetails(props) {
	const { profile } = props;

	const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), {
		newNickname: null,
		newAge: null,
	});

	const handleChange = (event) => {
		const { id, value } = event.target;
		setState({ [id]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		props.editProfile(state);
		props.history.push('/app/profile');
	};

	if (!isLoaded(profile)) return null;

	if (state.newNickname === null && isLoaded(profile)) {
		setState({ newNickname: profile.nickname, newAge: profile.age });
	}

	return (
		<div className='container'>
			<form onSubmit={handleSubmit} className='white'>
				<h2 className='grey-text text-darken-3'>Edit your profile</h2>
				<div className='input-field'>
					<label htmlFor='nickname' className={state.newNickname ? 'active' : ''}>
						Nickname
					</label>
					<input type='text' id='newNickname' onChange={handleChange} value={state.newNickname} />
				</div>
				<div className='input-field'>
					<label htmlFor='age' className={state.newAge ? 'active' : ''}>
						Age
					</label>
					<input id='newAge' type='number' onChange={handleChange} value={state.newAge} />
				</div>
				<div className='input-field'>
					<button className='btn pink lighten-1 z-depth-0 right waves-effect waves-light'>Submit</button>
				</div>
			</form>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		profile: state.firebase.profile,
	};
};

const mapDispatchToProps = {
	editProfile: profileActions.editProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);
