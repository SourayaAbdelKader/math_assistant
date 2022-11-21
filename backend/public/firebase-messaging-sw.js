// Add Firebase products that you want to use
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

// Firebase SDK
firebase.initializeApp({
    apiKey: 'AIzaSyCAPlvZzyytzGDBT6bwboWwNwKbCDESE0U"',
    authDomain: 'math-assistant-ac72e.firebaseapp.com',
    databaseURL: 'https://math-assistant-ac72e.firebaseio.com',
    projectId: 'math-assistant-ac72e',
    storageBucket: 'math-assistant-ac72e.appspot.com',
    messagingSenderId: '386046678237',
    appId: '1:386046678237:web:f67a69706ccb1c6da5f734',
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log("Message has received : ", payload);
    const title = "First, solve the problem.";
    const options = {
        body: "Push notificaiton!",
        icon: "/icon.png",
    };
    return self.registration.showNotification(
        title,
        options,
    );
});