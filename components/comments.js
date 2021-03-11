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

export default function Comments({ sug, suggestion }) {
  const classes = useStyles();
  const { loadingUser, user } = useUser();
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const [comments, setComments] = useState([]);
  let commentsIds = sug?.commentsIds;
  const commentsRef = firebase.firestore().collection("comments");
  const getComments = async (commentsIds) => {
    let comments = [];
    for (let i = 0; i < commentsIds.length; i++) {
      let doc = await commentsRef.doc(commentsIds[i]).get();
      let data = doc.data();
      let userData = await getUserData(data.author);
      data.author = userData.username;
      comments.push(data);
    }
    return comments;
  };

  useEffect(() => {
    const getData = async () => {
      let newComments = await getComments(commentsIds);
      setComments(newComments.reverse());
    };
    getData();
  }, [commentsIds]);

  let commentsDivs = comments.map((com, id) => {
    return (
      <div key={id}>
        <Paper
          style={{
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <p>{com.comment}</p>
          <p
            style={{ fontStyle: "italic", fontSize: "13px" }}
          >{`by ${com.author}`}</p>
        </Paper>
      </div>
    );
  });

  return (
    <>
      {user && (
        <Paper
          style={{
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <Formik
            initialValues={{
              comment: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              setFormError("");
              const { comment } = values;
              if (comment != "") {
                await postComment(comment, user.uid, suggestion);
                resetForm({});
                refreshData();
              } else if (comment === "") {
                setFormError(`please write your comment`);
              }
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <Form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <TextField
                  value={values.comment || ""}
                  onChange={handleChange}
                  type="text"
                  name="comment"
                  id="standard-basic"
                  label="write your comment"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Post
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      )}
      <div>
        <h2>Comments:</h2>
        {commentsDivs}
      </div>
    </>
  );
}
