import * as types from './actionTypes';
import { toast } from 'react-toastify';

export const addLesson = (lesson) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// make async call to database
		const firestore = getFirestore();
		const profile = getState().firebase.profile;
		const trainerId = getState().firebase.auth.uid;
		const date = new Date(lesson.date + lesson.time);

		firestore
			.collection('lessons')
			.add({
				date: date,
				studentMail: lesson.email,
				studentName: lesson.name,
				trainerId,
				trainerNickname: profile.nickname,
			})
			.then(() => {
				toast.success('New lesson scheduled');
				dispatch({ type: types.ADD_LESSON_SUCCESS, lesson });
			})
			.catch((err) => {
				dispatch({ type: types.ADD_LESSON_ERROR, err });
			});
	};
};

export const deleteLesson = (lessonId) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();

		firestore
			.collection('lessons')
			.doc(lessonId)
			.delete()
			.then(() => {
				toast.info('Lesson canceled');
				dispatch({ type: types.DELETE_LESSON_SUCCESSS });
			})
			.catch((err) => {
				toast.warrning('Lesson could not be canceled...');
				dispatch({ type: types.DELETE_LESSON_ERROR, lessonError: err });
			});
	};
};
