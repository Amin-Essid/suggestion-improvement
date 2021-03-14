import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useUser } from "../context/userContext";
import firebase from "firebase/app";
import "firebase/auth";
import { postSuggestion } from "../utils/postSuggestion";
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
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

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
}));

export default function CreateSuggestion() {
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
                await postSuggestion(
                  title,
                  description,
                  department,
                  category,
                  user.uid
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
            {({ handleChange, handleSubmit, setFieldValue }) => (
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
                      autoFocus
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
                    />
                    {/* <FormControl
                      variant="filled"
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="filled-age-native-simple">
                        Age
                      </InputLabel>
                      <Select
                        native
                        value={""}
                        onChange={handleChange}
                        inputProps={{
                          name: "age",
                          id: "filled-age-native-simple",
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                      </Select>
                    </FormControl> */}
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
