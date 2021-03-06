import firebase from "../firebase/clientApp";

export const deleteSuggestion = async (post) => {
  const db = firebase.firestore();
  await db.collection("posts").doc(post).delete();
};
