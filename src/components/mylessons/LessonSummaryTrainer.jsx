import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './LessonSummary.css';

LessonSummary.propTypes = {
	lesson: PropTypes.object.isRequired,
};

function LessonSummary(props) {
	const { lesson } = props;

	const handleDelete = async (event) => {
		event.preventDefault();
		props.delete(lesson.id);
	};

	return (
		<div className='card z-depth-0 lesson-summary cyan lighten-5'>
			<div className='card-content grey-text text-darken-3'>
				<span className='card-title'>{lesson.studentName}</span>
				<p className='grey-text text-darken-1'>{moment(new Date(lesson.date.seconds * 1000)).calendar()}</p>
				<button
					onClick={handleDelete}
					className='btn-floating waves-effect waves-light pink darken-2 z-depth-0 right btn-large'
					title='Cancel Lessson'
					aria-label='Cancel Lesson'
				>
					<i className='material-icons'>close</i>
				</button>
			</div>
		</div>
	);
}

export default LessonSummary;
