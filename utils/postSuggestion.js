import firebase from "../firebase/clientApp";

export const postSuggestion = async (
  title,
  description,
  department,
  category,
  author
) => {
  const db = firebase.firestore();
  const suggestionsRef = db.collection("posts");
  const { serverTimestamp } = firebase.firestore.FieldValue;
  await suggestionsRef.add({
    title,
    description,
    department,
    category,
    author,
    createdAt: serverTimestamp(),
    commentsIds: [],
    upvotes: 0,
    usersWhoLikedItIds: [],
  });
};
