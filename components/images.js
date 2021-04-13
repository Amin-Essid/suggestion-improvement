import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "firebase/auth";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { default as React, useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import firebase from "../firebase/clientApp";
import { postComment } from "../utils/postComment";
import { getUserData } from "../fetchData/getUserData";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "50px",
  },
}));

export default function Images({ sug }) {
  //   const [load, setLoad] = useState(false);
  const router = useRouter();
  //   const [comments, setComments] = useState([]);
  let imagesUrl = sug?.imagesUrl;
  //   const commentsRef = firebase.firestore().collection("comments");
  //   const getComments = async (commentsIds) => {
  //     let comments = [];
  //     for (let i = 0; i < commentsIds.length; i++) {
  //       let doc = await commentsRef.doc(commentsIds[i]).get();
  //       let data = doc.data();
  //       let userData = await getUserData(data.author);
  //       data.author = userData.username;
  //       comments.push(data);
  //     }
  //     return comments;
  //   };

  //   useEffect(() => {
  //     const getData = async () => {
  //       let newComments = await getComments(commentsIds);
  //       setLoad(true);
  //       setComments(newComments.reverse());
  //     };
  //     getData();
  //   }, [commentsIds]);

  let imagesDivs = imagesUrl.map((url, id) => {
    // let date = new Date(com.createdAt.seconds * 1000).toDateString();
    return (
      <span key={id}>
        <img
          key={id}
          style={{
            marginTop: "10px",
            width: "300px",
          }}
          src={url}
        />
      </span>
    );
  });

  return (
    <>
      <div>
        <h2>Images:</h2>
        {imagesDivs}
      </div>
    </>
  );
}
