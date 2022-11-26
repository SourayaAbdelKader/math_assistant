import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
const firebaseConfig = {
    // Add your config here
  };

initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getTokens = async (setTokenFound) => {
    return getToken(messaging, {vapidKey: 'BF5mtC6xP5t-gULLsVkzmV3Zu0BR6PmixRwCLezeNNOMxAHI9MIbchCx6aMWiz66ozsBkhNz83sUgCNqOJs6FJg'}).then((currentToken) => {
      if (currentToken) {
        localStorage.setItem('device_token', currentToken)
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
};
    export const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
  });