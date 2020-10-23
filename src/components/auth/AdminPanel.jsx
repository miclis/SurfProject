import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty, useFirebase } from 'react-redux-firebase';

const AdminPanel = () => {
	const [email, setEmail] = useState('');
	const token = useSelector((state) => state.firebase.profile.token);
	const firebase = useFirebase();

	if (!isLoaded(token) || isEmpty(token) || !token.claims.admin) return null;

	const handleSubmit = (event) => {
		event.preventDefault();
		const addAdminRole = firebase.functions().httpsCallable('addAdminRole');
		addAdminRole({ email })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className='container'>
			<form onSubmit={handleSubmit} className='white'>
				<h5 className='grey-text text-darken-3'>Admin Panel</h5>
				<div className='input-field'>
					<label htmlFor='email'>Email</label>
					<input type='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
				</div>
				<div className='input-field center'>
					<button className='btn pink lighten-1 z-depth-0 center'>Make Trainer</button>
				</div>
			</form>
		</div>
	);
};

export default AdminPanel;
