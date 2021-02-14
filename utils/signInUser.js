import firebase from "firebase/app";
import "firebase/auth";

export const signInUser = async (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in

      // alert("User loggedin!!");
      return userCredential.user;
      // ...
    })
    .catch((error) => {
      alert(error.message);
      // ..
    });
};
