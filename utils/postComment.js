import firebase from "../firebase/clientApp";

export const postComment = async (comment, author, suggestion) => {
  const db = firebase.firestore();
  const commentsRef = db.collection("comments");
  const suggestionRef = db.collection("posts").doc(suggestion);
  const { serverTimestamp } = firebase.firestore.FieldValue;
  const docRef = await commentsRef.add({
    comment,
    author,
    createdAt: serverTimestamp(),
  });
  console.log(docRef.id);

  await suggestionRef.update({
    commentsIds: firebase.firestore.FieldValue.arrayUnion(docRef.id),
  });
};
