import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useUser } from "../context/userContext";
import firebase from "firebase/app";
import "firebase/auth";
import { createUser } from "../utils/createUser";
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
import { default as StyledLink } from "@material-ui/core/Link";

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

export default function Register() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();
  const [formError, setFormError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      console.log("user: " + user);
      if (user) {
        const email_verified = firebase.auth().currentUser.emailVerified;
        if (email_verified) {
          router.push("/");
        } else {
          router.push("/verification");
        }
      }
    }
    // You also have your firebase app initialized
    console.log(firebase);
  }, [loadingUser, user]);
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Formik
            initialValues={{
              email: "",
              password: "",
              username: "",
              role: "",
            }}
            onSubmit={async (values) => {
              setFormError("");
              console.log(values);
              const { email, username, password, password2, role } = values;
              if (
                email != "" &&
                username != "" &&
                password != "" &&
                role != "" &&
                password === password2
              ) {
                await createUser(email, password, username, role);
              } else if (username === "") {
                setFormError(`please verify your username`);
              } else if (email === "") {
                setFormError(`please verify your email`);
              } else if (role === "") {
                setFormError(`please verify your role`);
              } else if (password === "" || password !== password2) {
                setFormError("please verify your password");
              }
              if (!user) {
                setFormError(`please verify your cridentials`);
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
                      name="username"
                      variant="outlined"
                      required
                      fullWidth
                      label="username"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={handleChange}
                      type="email"
                      autoComplete="fname"
                      name="email"
                      variant="outlined"
                      required
                      fullWidth
                      label="Email"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={handleChange}
                      type="text"
                      autoComplete="fname"
                      name="role"
                      variant="outlined"
                      required
                      fullWidth
                      label="Role"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={handleChange}
                      type="password"
                      variant="outlined"
                      required
                      fullWidth
                      label="password"
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
                      label="confirm password"
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
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/reset_password">Forgot password?</Link>
                  </Grid>
                  <Grid item>
                    <Link href="/login">
                      {"you already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
}
