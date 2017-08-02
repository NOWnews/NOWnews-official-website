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
  console.log('Requesting permission...');
    // [START request_permission]
  messaging.requestPermission()
    .then(function () {
      console.log('Notification permission granted.');
      messaging.getToken()
    .then(function (currentToken) {
      if (currentToken) {
        postTokenApi(currentToken, apiServ, headers);
        console.log('currentToken', currentToken);
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
  console.log('wb!!!');

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

