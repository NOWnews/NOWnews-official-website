import { initializeApp as fbInitializeApp, messaging as fbMessaging } from 'firebase';
import axios from 'axios';
import isomorphicCookie from 'isomorphic-cookie';

const postTokenApi = (currentToken, apiServ, headers) => {
  let MemberId = isomorphicCookie.load('NOW_member');
  axios.post(`${apiServ}/app/info`, {
    MemberId,
    deviceId: currentToken,
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
  const isProd = window.location.hostname === 'www.nownews.com';
  const prodConfig = {
    apiKey: 'AIzaSyDBlAn97NaEGJuq-IuW5nrLOu8wlx-8fsg',
    authDomain: 'spry-smithy-96510.firebaseapp.com',
    databaseURL: 'https://spry-smithy-96510.firebaseio.com',
    projectId: 'spry-smithy-96510',
    storageBucket: 'spry-smithy-96510.appspot.com',
    messagingSenderId: '581106378067'
  };
  const devConfig = {
    apiKey: 'AIzaSyD1JIxcN2gSIPlkhpHk197TQ3jEhvVqiyg',
    authDomain: 'nownews-website-167108.firebaseapp.com',
    databaseURL: 'https://nownews-website-167108.firebaseio.com',
    projectId: 'nownews-website-167108',
    storageBucket: '',
    messagingSenderId: '909045564165'
  };
  const config = isProd ? prodConfig : devConfig;
  fbInitializeApp(config);
  const messaging = fbMessaging();
  requestPermission(messaging, apiServ, headers);
};

