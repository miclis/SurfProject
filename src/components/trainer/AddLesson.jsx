import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import * as lessonActions from '../../store/actions/lesson.actions';
import M from 'materialize-css/dist/js/materialize.min';

const AddLesson = (props) => {
	const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), {
		name: '',
		email: '',
		date: '',
		time: '',
	});

	const token = useSelector((state) => state.firebase.profile.token);

	useEffect(() => {
		const datePicker = document.querySelector('#date');
		M.Datepicker.init(datePicker, {
			firstDay: 1,
			minDate: new Date(),
			onSelect: (date) => {
				setState({ date: Date.parse(date) });
			},
		});
		const timePicker = document.querySelector('#time');
		M.Timepicker.init(timePicker, {
			twelveHour: false,
			onSelect: (hour, minute) => setState({ time: new Date(`1970-01-01 ${hour}:${minute}:00 UTC+0`).getTime() }),
		});
	}, []);

	if (!isLoaded(token) || isEmpty(token) || !token.claims.trainer) return <Redirect to='/app' />;

	const handleChange = (event) => {
		const { id, value } = event.target;
		setState({ [id]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		props.addLesson(state);
		props.history.push('/app');
	};

	return (
		<form onSubmit={handleSubmit} className='white'>
			<h3 className='grey-text text-darken-3'>Schedule new lesson</h3>
			<div className='input-field'>
				<label htmlFor='name'>Student's Name</label>
				<input type='text' id='name' onChange={handleChange} value={state.name} />
			</div>
			<div className='input-field'>
				<label htmlFor='email'>Student's Email</label>
				<input type='email' id='email' onChange={handleChange} value={state.email} />
			</div>
			<div className='input-field'>
				<label htmlFor='date'>Date</label>
				<input id='date' type='text' className='datePicker' />
			</div>
			<div className='input-field'>
				<label htmlFor='time'>Time</label>
				<input id='time' type='text' className='timePicker' />
			</div>
			<div className='input-field'>
				<button className='btn pink lighten-1 z-depth-0'>Schedule</button>
			</div>
		</form>
	);
};

const mapDispatchToProps = {
	addLesson: lessonActions.addLesson,
};

export default connect(null, mapDispatchToProps)(AddLesson);
