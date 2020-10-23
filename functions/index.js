const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.addTrainerRole = functions.https.onCall((data, context) => {
	// check request is made by an admin
	if (context.auth.token.admin !== true) {
		return { error: 'Only admins can add other admins, sucker!' };
	}
	// get user and add custom claim (trainer)
	return admin
		.auth()
		.getUserByEmail(data.email)
		.then((user) => {
			return admin.auth().setCustomUserClaims(user.uid, {
				trainer: true,
			});
		})
		.then(() => {
			return {
				message: `Success! ${data.email} has been made a trainer.`,
			};
		})
		.catch((err) => err);
});

exports.addAdminRole = functions.https.onCall((data, context) => {
	// check request is made by an admin
	// if (context.auth.token.admin !== true) {
	//     return { error: 'Only admins can add other admins, sucker!' };
	// }
	// get user and add custom claim (trainer)
	return admin
		.auth()
		.getUserByEmail(data.email)
		.then((user) => {
			return admin.auth().setCustomUserClaims(user.uid, {
				admin: true,
				trainer: true,
			});
		})
		.then(() => {
			return {
				message: `Success! ${data.email} has been made a trainer.`,
			};
		})
		.catch((err) => err);
});

exports.lessonAdded = functions.firestore.document('lessons/{lessonId}').onCreate((doc) => {
	return admin
		.auth()
		.getUserByEmail(lesson.studentMail)
		.then((student) => {
			if (!doc.studentName) {
				return admin
					.firestore()
					.collection('lessons')
					.doc(doc.id)
					.update({
						studentName: student.nickname ? student.nickname : student.firstName,
					});
			} else {
				return null;
			}
		});
});
