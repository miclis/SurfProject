import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './LessonSummary.css';

LessonSummary.propTypes = {
	lesson: PropTypes.object.isRequired,
};

function LessonSummary(props) {
	const { lesson } = props;

	return (
		<div className='card z-depth-0 lesson-summary cyan lighten-5'>
			<div className='card-content grey-text text-darken-3'>
				<span className='card-title'>{lesson.trainer}</span>
				<p className='grey-text text-darken-1'>{moment(lesson.date.toDate()).calendar()}</p>
				<button
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
