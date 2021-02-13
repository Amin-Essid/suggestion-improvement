import firebase from "firebase/app";
import "firebase/auth";

export const createUser = async () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};
