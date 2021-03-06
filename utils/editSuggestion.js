import firebase from "../firebase/clientApp";

export const editSuggestion = async (
  suggestion,
  title,
  description,
  department,
  category
) => {
  const db = firebase.firestore();
  const suggestionRef = db.collection("posts").doc(suggestion);
  const { serverTimestamp } = firebase.firestore.FieldValue;
  await suggestionRef.update({
    title,
    description,
    department,
    category,
    createdAt: serverTimestamp(),
  });
};
