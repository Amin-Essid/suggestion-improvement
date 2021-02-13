import firebase from "firebase/app";
import "firebase/auth";
import { verifyEmail } from "./verifyEmail";

export const createUser = async (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password, username)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;

      const email_verified = firebase.auth().currentUser.emailVerified;
      await verifyEmail(user);
      console.log(email_verified);
      const db = firebase.firestore();
      await db.collection("users").doc(user.uid).set({ username, email });
      alert("User created!!");
      return { status: true, user };
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return { status: true, errorCode, errorMessage };
      // ..
    });
};
