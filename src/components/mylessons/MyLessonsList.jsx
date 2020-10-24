import React from 'react';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import Spinner from '../common/Spinner';
import LessonSummary from './LessonSummary';
import LessonSummaryTrainer from './LessonSummaryTrainer';
import * as lessonActions from '../../store/actions/lesson.actions';
import { PropTypes } from 'prop-types';

MyLessonsList.propTypes = {
	deleteLesson: PropTypes.func.isRequired,
};

function MyLessonsList(props) {
	const auth = useSelector((state) => state.firebase.auth);
	const myLessonsStudent = useSelector((state) => state.firestore.ordered.myLessonsStudent);
	const myLessonsTrainer = useSelector((state) => state.firestore.ordered.myLessonsTrainer);
	useFirestoreConnect([
		{
			collection: 'lessons',
			storeAs: 'myLessonsStudent',
			where: ['studentMail', '==', auth.email],
			orderBy: ['date', 'asc'],
		},
		{
			collection: 'lessons',
			storeAs: 'myLessonsTrainer',
			where: ['trainerId', '==', auth.uid],
			orderBy: ['date', 'asc'],
		},
	]);

	const token = useSelector((state) => state.firebase.profile.token);

	if (
		!isLoaded(myLessonsStudent) ||
		!isLoaded(myLessonsTrainer) ||
		!isLoaded(token) ||
		isEmpty(token) ||
		!token.claims
	) {
		return <Spinner />;
	}

	if (isEmpty(myLessonsStudent) && isEmpty(myLessonsTrainer)) {
		return <h1>You have no lessons scheduled...</h1>;
	}

	return (
		<div className='myLessons'>
			<h2 className='grey-text text-darken-3'>Near Schedule</h2>
			{token.claims.trainer
				? myLessonsTrainer.map((lesson) => (
						<LessonSummaryTrainer key={lesson.id} lesson={lesson} delete={props.deleteLesson} />
				  ))
				: myLessonsStudent.map((lesson) => (
						<LessonSummary key={lesson.id} lesson={lesson} delete={props.deleteLesson} />
				  ))}
		</div>
	);
}

const mapDispatchToProps = {
	deleteLesson: lessonActions.deleteLesson,
};

export default connect(null, mapDispatchToProps)(MyLessonsList);
