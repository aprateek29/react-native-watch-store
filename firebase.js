import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhAf1xlo46F9DYgUwO2qB4qR2aJCEMLEM",
  authDomain: "telegram-clone-9a670.firebaseapp.com",
  projectId: "telegram-clone-9a670",
  storageBucket: "telegram-clone-9a670.appspot.com",
  messagingSenderId: "498694028432",
  appId: "1:498694028432:web:a1459207bbf3919f1dec15",
};

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const storage = app.storage();
const auth = firebase.auth();

export { db, auth, storage };
