
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDbEbGcDtzX69Y39KX6byWkcmAJ9o_Kga4",
    authDomain: "to-do-app-3fecf.firebaseapp.com",
    projectId: "to-do-app-3fecf",
    storageBucket: "to-do-app-3fecf.appspot.com",
    messagingSenderId: "1007343149248",
    appId: "1:1007343149248:web:bebafff4034ba8cd6d8d25",
    measurementId: "G-1GBHWRYYNF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const auth = getAuth();

var myInput = document.getElementById("myInput").value;
var addBtn = document.getElementById("addBtn");

window.addlist = function () {
  var obj = {
    myInput: myInput.value,
    addBtn: addBtn.value,
	myUL : myUL.value,
  };
  console.log(obj.value);

  obj.id = push(ref(database, "list/")).key;
  const postListRef = ref(database, `list/${obj.id}`);
  set(postListRef, obj);
};







// signup
// ================
var name = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");

window.signUp = function () {
  var userObj = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  console.log(userObj);
  createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      userObj.id = user.uid;

      var userReference = ref(database, `users/${userObj.id}`);
      set(userReference, userObj);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
};

// login
// ===============

window.login = function () {
  var userObj = {
    email: email.value,
    password: password.value,
  };
  console.log(userObj);
  signInWithEmailAndPassword(auth, userObj.email, userObj.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user.uid);
      var userRef = ref(database, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
};
