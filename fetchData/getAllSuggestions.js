import firebase from "../firebase/clientApp";

export const getAllSuggestions = async (num = 50) => {
  const db = firebase.firestore();
  const suggestionsRef = db.collection("posts");
  const suggestions = await suggestionsRef.get();
  // console.log(suggestions);
  // .docs.map((doc) => doc.data());
  // .orderBy("createdAt")
  // .limit(num)

  return suggestions.docs.map((doc) => doc.data());
};
