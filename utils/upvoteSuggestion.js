import firebase from "../firebase/clientApp";

export const upvoteSuggestion = async (suggestion, userId) => {
  const db = firebase.firestore();
  const suggestionRef = db.collection("posts").doc(suggestion);

  await db
    .runTransaction((transaction) => {
      return transaction.get(suggestionRef).then((sug) => {
        if (!sug.exists) {
          throw "Document does not exist!";
        }
        const upvotes = sug.data().upvotes + 1;
        transaction.update(suggestionRef, { upvotes });
      });
    })
    .then(() => {
      console.log("Transaction successfully committed!");
    })
    .catch((error) => {
      console.log("Transaction failed: ", error);
    });
  await suggestionRef.update({
    usersWhoLikedItIds: firebase.firestore.FieldValue.arrayUnion(userId),
  });
};

export const RemoveUpvoteSuggestion = async (suggestion, userId) => {
  const db = firebase.firestore();
  const suggestionRef = db.collection("posts").doc(suggestion);

  await db
    .runTransaction((transaction) => {
      return transaction.get(suggestionRef).then((sug) => {
        if (!sug.exists) {
          throw "Document does not exist!";
        }
        const upvotes = sug.data().upvotes - 1;
        transaction.update(suggestionRef, { upvotes });
      });
    })
    .then(() => {
      console.log("Transaction successfully committed!");
    })
    .catch((error) => {
      console.log("Transaction failed: ", error);
    });
  await suggestionRef.update({
    usersWhoLikedItIds: firebase.firestore.FieldValue.arrayRemove(userId),
  });
};
