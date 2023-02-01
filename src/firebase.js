import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp(firebaseConfig);

const firebaseConfig = {
    apiKey: "AIzaSyALmTermsnlmGpQ3qtn-sKJ6e61c6umKMI",
    authDomain: "social-media-d3bb4.firebaseapp.com",
    projectId: "social-media-d3bb4",
    storageBucket: "social-media-d3bb4.appspot.com",
    messagingSenderId: "972015921763",
    appId: "1:972015921763:web:8bc56365f01e4f8f89a656"
  };

  export default firebase;