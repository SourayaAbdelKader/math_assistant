importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyCAPlvZzyytzGDBT6bwboWwNwKbCDESE0U",
    authDomain: "math-assistant-ac72e.firebaseapp.com",
    projectId: "math-assistant-ac72e",
    storageBucket: "math-assistant-ac72e.appspot.com",
    messagingSenderId: "386046678237",
    appId: "1:386046678237:web:f67a69706ccb1c6da5f734",
    measurementId: "G-R26G2XBC86"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  }});