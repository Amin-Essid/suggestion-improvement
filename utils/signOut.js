import firebase from "firebase/app";
import "firebase/auth";

export const signOut = async () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      alert(error.message);
    });
};
