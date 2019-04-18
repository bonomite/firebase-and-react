
import firebase from 'firebase'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDUFui_1ll6NUhsD7_Dj7-BmoHAzhmzX0Y",
    authDomain: "reacttutorial-242bb.firebaseapp.com",
    databaseURL: "https://reacttutorial-242bb.firebaseio.com",
    projectId: "reacttutorial-242bb",
    storageBucket: "reacttutorial-242bb.appspot.com",
    messagingSenderId: "285345382197"
  };
  var fire = firebase.initializeApp(config);
  export default fire;
