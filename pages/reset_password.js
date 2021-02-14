import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useUser } from "../context/userContext";
import firebase from "firebase/app";
import "firebase/auth";
import { signInUser } from "../utils/signInUser";
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

export default function ResetPassword() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();
  const [formError, setFormError] = useState("");
  const router = useRouter();
  let layout;
  if (user) {
    layout = (
      <Formik
        initialValues={{
          password: "",
          password2: "",
        }}
        onSubmit={async (values) => {
          setFormError("");
          console.log(values);
          const { password2, password } = values;
          if (password != "" && password === password2) {
            await firebase.auth().currentUser.updatePassword(password);
            router.push("/");
          } else if (password === "" || password !== password2) {
            setFormError(`please verify your password`);
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  type="password"
                  variant="outlined"
                  required
                  fullWidth
                  label="new password"
                  name="password"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  type="password"
                  variant="outlined"
                  required
                  fullWidth
                  label="confirm new password"
                  name="password2"
                  autoComplete="lname"
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
              Log In
            </Button>
          </form>
        )}
      </Formik>
    );
  } else {
    layout = (
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={async (values) => {
          setFormError("");
          console.log(values);
          const { email } = values;
          if (email != "") {
            await firebase.auth().sendPasswordResetEmail(email);
            router.push("/");
          } else if (password === "") {
            setFormError(`please insert your email`);
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  type="email"
                  variant="outlined"
                  required
                  fullWidth
                  label="email"
                  name="email"
                  autoComplete="lname"
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
              send an email to reset the password
            </Button>
          </form>
        )}
      </Formik>
    );
  }

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      console.log("user: " + user);
    }
  }, [loadingUser, user]);
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {layout}
        </div>
      </Container>
    </>
  );
}
