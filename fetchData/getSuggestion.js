import firebase from "../firebase/clientApp";

export const getSuggestion = async (suggestionId) => {
  const db = firebase.firestore();
  const suggestionRef = db.collection("posts").doc(suggestionId);
  const suggestion = await suggestionRef.get();

  return suggestion.data();
};
