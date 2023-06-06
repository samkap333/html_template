import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';



const firebaseConfig = {
    apiKey: "AIzaSyBYR6UVS243OTIa7NetlZQPS5_73LU5xPI",
    authDomain: "firstapp-9762f.firebaseapp.com",
    projectId: "firstapp-9762f",
    storageBucket: "firstapp-9762f.appspot.com",
    messagingSenderId: "76223779395",
    appId: "1:76223779395:web:184e02189da569dafe7af6",
    measurementId: "G-SW7N72MTHN"
  };

  firebase.initializeApp(firebaseConfig)
  export default firebase