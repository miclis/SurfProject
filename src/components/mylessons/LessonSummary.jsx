import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './LessonSummary.css';

LessonSummary.propTypes = {
	lesson: PropTypes.object.isRequired,
};


function LessonSummary(props) {
	const { lesson } = props;

	function checkNotificationPromise() {
		try {
			Notification.requestPermission().then();
		} catch (e) {
			return false;
		}

		return true;
	}

	function askNotificationPermission() {
		// function to actually ask the permissions
		function handlePermission(permission) {
			// Whatever the user answers, we make sure Chrome stores the information
			if (!('permission' in Notification)) {
				Notification.permission = permission;
			}
		}

		// Let's check if the browser supports notifications
		if (!('Notification' in window)) {
			console.log('This browser does not support notifications.');
		} else {
			if (checkNotificationPromise()) {
				Notification.requestPermission().then((permission) => {
					handlePermission(permission);
				});
			} else {
				Notification.requestPermission(function (permission) {
					handlePermission(permission);
				});
			}
		}
	}

	const handleReminderClick = (event) => {

	}

	return (
		<div className='card z-depth-0 lesson-summary cyan lighten-5'>
			<div className='card-content grey-text text-darken-3'>
				<span className='card-title'>{lesson.trainer}</span>
				<p className='grey-text text-darken-1'>{moment(lesson.date.toDate()).calendar()}</p>
				<button
					onClick={askNotificationPermission}
					className='btn-floating waves-effect waves-light pink darken-2 z-depth-0 right btn-large'
					title='Set Reminder'
					aria-label='Set Reminder'
				>
					<i className='material-icons'>alarm</i>
				</button>
			</div>
		</div>
	);
}

export default LessonSummary;
