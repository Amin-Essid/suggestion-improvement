import firebase from "firebase/app";
import "firebase/auth";

export const signInUser = async (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      return userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return { errorCode, errorMessage };
      // ..
    });
};
