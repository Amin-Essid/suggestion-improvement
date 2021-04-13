import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useUser } from "../context/userContext";
import firebase from "firebase/app";
import "firebase/auth";
import { postSuggestion } from "../utils/postSuggestion";
// ********************************************************************
// import { addImageUrl } from "../utils/addImageUrl";
// ********************************************************************
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/header";
import { Field } from "formik";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CreateSuggestion() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();
  const [formError, setFormError] = useState("");
  const router = useRouter();
  // ****************************
  const storageRef = firebase.storage().ref();
  // ****************************

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      if (user) {
        const email_verified = firebase.auth().currentUser.emailVerified;
        if (!email_verified) {
          router.push("/verification");
        }
      } else {
        router.push("/login");
      }
    }
  }, [loadingUser, user]);
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Post Suggestion</title>
      </Head>
      <Header />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Post Suggestion
          </Typography>

          <Typography
            style={{ marginTop: "20px !important" }}
            component="p"
            variant="subtitle2"
          >
            Your ideas and suggestions can improve our products and processes.
            Thank you for support.
          </Typography>

          <Typography component="p" variant="subtitle2">
            Best idea providers will receive a bonus.
          </Typography>

          <Formik
            initialValues={{
              title: "",
              description: "",
              department: "",
              category: "",
              toggle: false,
              // ****************************
              imageOne: null,
              imageTwo: null,
              imageThree: null,
              // ****************************
            }}
            onSubmit={async (values) => {
              setFormError("");
              const {
                title,
                description,
                department,
                category,
                toggle,
                // ****************************
                imageOne,
                imageTwo,
                imageThree,
                // ****************************
              } = values;

              console.log(values);
              if (
                title != "" &&
                description != "" &&
                department != "" &&
                category != "" &&
                toggle === true
              ) {
                // *************************************
                let urlsArray = [];
                if (imageOne) {
                  console.log(imageOne);
                  var imageOneRef = storageRef.child(imageOne.name);
                  console.log(imageOneRef.fullPath);
                  await imageOneRef.put(imageOne).then(async (snapshot) => {
                    console.log("Uploaded img1");
                    await snapshot.ref
                      .getDownloadURL()
                      .then(function (downloadURL) {
                        console.log("File available at", downloadURL);
                        urlsArray.push(downloadURL);
                      });
                  });
                }
                if (imageTwo) {
                  console.log(imageTwo);
                  var imageTwoRef = storageRef.child(imageTwo.name);
                  console.log(imageTwoRef.fullPath);
                  await imageTwoRef.put(imageTwo).then(async (snapshot) => {
                    console.log("Uploaded img2");
                    await snapshot.ref
                      .getDownloadURL()
                      .then(function (downloadURL) {
                        console.log("File available at", downloadURL);
                        urlsArray.push(downloadURL);
                      });
                  });
                }
                if (imageThree) {
                  console.log(imageThree);
                  var imageThreeRef = storageRef.child(imageThree.name);
                  console.log(imageThreeRef.fullPath);
                  await imageThreeRef.put(imageThree).then(async (snapshot) => {
                    console.log("Uploaded img3");
                    await snapshot.ref
                      .getDownloadURL()
                      .then(function (downloadURL) {
                        console.log("File available at", downloadURL);
                        urlsArray.push(downloadURL);
                      });
                  });
                }
                // **************************************************
                await postSuggestion(
                  title,
                  description,
                  department,
                  category,
                  user.uid,
                  urlsArray
                );
                router.push("/");
              } else if (
                title === "" ||
                description === "" ||
                department === "" ||
                category === "" ||
                toggle === false
              ) {
                setFormError(`please fill in all the fields`);
              }
            }}
          >
            {({ handleChange, handleSubmit, setFieldValue, values }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <TextField
                      onChange={handleChange}
                      type="text"
                      autoComplete="fname"
                      name="title"
                      variant="outlined"
                      required
                      fullWidth
                      label="Title"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={4}
                      rowsMax={20}
                      autoComplete="fname"
                      name="description"
                      variant="outlined"
                      required
                      fullWidth
                      label="Description"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field className="select-css" as="select" name="department">
                      <option value="" disabled>
                        Departement
                      </option>
                      <option value="Purchasing">Purchasing</option>
                      <option value="Sale">Sale</option>
                      <option value="Production">Production</option>
                      <option value="Customer service">Customer service</option>
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field className="select-css" as="select" name="category">
                      <option value="" disabled>
                        Category
                      </option>
                      <option value="Process improvement">
                        Process improvement
                      </option>
                      <option value="Product improvement">
                        Product improvement
                      </option>
                      <option value="New idea">New idea</option>
                      <option value="Other">Other</option>
                    </Field>
                  </Grid>
                  {/* *********************************************** */}
                  <Grid item xs={12}>
                    <p>
                      you can upload multiple images to make your suggestion
                      clearer:
                    </p>
                    <input
                      id="imageOne"
                      name="imageOne"
                      type="file"
                      onChange={(event) => {
                        setFieldValue("imageOne", event.currentTarget.files[0]);
                      }}
                    />
                    {values.imageOne ? (
                      <input
                        id="imageTwo"
                        name="imageTwo"
                        type="file"
                        onChange={(event) => {
                          setFieldValue(
                            "imageTwo",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                    ) : null}
                    {values.imageTwo ? (
                      <input
                        id="imageThree"
                        name="imageThree"
                        type="file"
                        onChange={(event) => {
                          setFieldValue(
                            "imageThree",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                    ) : null}
                    <br />
                  </Grid>
                  {/* *********************************************** */}
                  <Grid item xs={12}>
                    <label>
                      <Field type="checkbox" name="toggle" />I accept the rules
                      and have read the FAQ
                    </label>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{ color: "red !important" }}
                  >
                    {formError}
                  </Typography>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Post
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
}
