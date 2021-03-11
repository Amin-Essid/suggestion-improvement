import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useUser } from "../../context/userContext";
import firebase from "firebase/app";
import "firebase/auth";
import { editSuggestion } from "../../utils/editSuggestion";
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
import { getSuggestion } from "../../fetchData/getSuggestion";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
}));

export default function EditSuggestion({ data }) {
  const { sug, suggestion } = data;
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();
  const [formError, setFormError] = useState("");
  const router = useRouter();

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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Post Suggestion
          </Typography>

          <Formik
            initialValues={{
              title: sug.title,
              description: sug.description,
              department: sug.department,
              category: sug.category,
            }}
            onSubmit={async (values) => {
              setFormError("");
              const { title, description, department, category } = values;
              if (
                title != "" &&
                description != "" &&
                department != "" &&
                category != ""
              ) {
                await editSuggestion(
                  suggestion,
                  title,
                  description,
                  department,
                  category
                );
                router.push("/");
              } else if (
                title === "" ||
                description === "" ||
                department === "" ||
                category === ""
              ) {
                setFormError(`please fill in all the fields`);
              }
            }}
          >
            {({ handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
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
                      defaultValue={sug.title}
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
                      autoFocus
                      defaultValue={sug.description}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={handleChange}
                      type="text"
                      autoComplete="fname"
                      name="department"
                      variant="outlined"
                      required
                      fullWidth
                      label="Department"
                      autoFocus
                      defaultValue={sug.department}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={handleChange}
                      type="text"
                      autoComplete="fname"
                      name="category"
                      variant="outlined"
                      required
                      fullWidth
                      label="Category"
                      autoFocus
                      defaultValue={sug.category}
                    />
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

export const getServerSideProps = async ({ params }) => {
  const { suggestion } = params;
  let sug = await getSuggestion(suggestion);
  if (!sug) {
    return { notFound: true };
  }
  sug = JSON.parse(JSON.stringify(sug));
  return { props: { data: { sug, suggestion } } };
};
