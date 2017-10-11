import { initializeApp as fbInitializeApp, messaging as fbMessaging } from 'firebase';
import axios from 'axios';
import isomorphicCookie from 'isomorphic-cookie';

const postTokenApi = (currentToken, apiServ, headers) => {
  let cookie = isomorphicCookie.load('NOW_personalize');
  axios.post(`${apiServ}/app/info`, {
    deviceId: cookie,
    token: currentToken,
    os: 'WEB'
  }, { headers });
};

const requestPermission = (messaging, apiServ, headers) => {
  messaging
    .requestPermission()
    .then(() => {
      messaging.getToken()
      .then((currentToken) => {
        if (currentToken) {
          postTokenApi(currentToken, apiServ, headers);
        } else {
          console.error('No Instance ID token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.error('An error occurred while retrieving token. ', err);
      });
    }).catch((err) => {
      console.error('Unable to get permission to notify.', err);
    });
};

export const firebaseInit = (apiServ, headers) => {
  let config = {
    apiKey: 'AIzaSyDBlAn97NaEGJuq-IuW5nrLOu8wlx-8fsg',
    authDomain: 'spry-smithy-96510.firebaseapp.com',
    databaseURL: 'https://spry-smithy-96510.firebaseio.com',
    projectId: 'spry-smithy-96510',
    storageBucket: 'spry-smithy-96510.appspot.com',
    messagingSenderId: '581106378067'
  };
  fbInitializeApp(config);
  const messaging = fbMessaging();

  requestPermission(messaging, apiServ, headers);
};

