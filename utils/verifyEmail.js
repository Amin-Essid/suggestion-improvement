import firebase from "firebase/app";
import "firebase/auth";

export const verifyEmail = async (user) => {
  user
    .sendEmailVerification()
    .then(function () {
      // Email sent.
      console.log("email verification sent");
    })
    .catch(function (error) {
      alert(error.message);
    });
};
