importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
	messagingSenderId: '976436472142',
	appId: '1:976436472142:web:68707ed04f8f4d18a3961f',
	projectId: 'dev-surfproject',
	apiKey: 'AIzaSyC9YQfh5kdk-g2sXCHU5O1YGGxckGs5QyA',
});

const initMessaging = firebase.messaging();
