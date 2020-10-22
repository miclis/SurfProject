import React from 'react';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import Spinner from '../common/Spinner';
import LessonSummary from './LessonSummary';

MyLessonsList.propTypes = {};

function MyLessonsList() {
	const auth = useSelector((state) => state.firebase.auth);
	const myLessons = useSelector((state) => state.firestore.ordered.myLessons);
	useFirestoreConnect([
		{ collection: 'lessons', storeAs: 'myLessons', where: ['student', '==', auth.uid], orderBy: ['date', 'desc'] },
	]);

	if (!isLoaded(myLessons)) {
		return <Spinner />;
	}

	if (isEmpty(myLessons)) {
		return <h1>You have no lessons scheduled...</h1>;
	}

	return (
		<div className='myLessons section'>
			{myLessons.map((lesson) => (
				<LessonSummary key={lesson.id} lesson={lesson} />
			))}
		</div>
	);
}

export default MyLessonsList;
