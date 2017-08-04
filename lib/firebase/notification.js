import * as firebase from 'firebase';
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
  messaging.requestPermission()
    .then(function () {
      messaging.getToken()
    .then(function (currentToken) {
      if (currentToken) {
        postTokenApi(currentToken, apiServ, headers);
      } else {
        console.error('No Instance ID token available. Request permission to generate one.');
      }
    })
    .catch(function (err) {
      console.error('An error occurred while retrieving token. ', err);
    });
    })
    .catch(function (err) {
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
  firebase.initializeApp(config);
  const messaging = firebase.messaging();

  requestPermission(messaging, apiServ, headers);
};

