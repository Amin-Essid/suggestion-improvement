import firebase from "../firebase/clientApp";

export const getUserData = async (userId) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userId);
  const userData = await userRef.get();

  return userData.data();
};
