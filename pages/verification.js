import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useUser } from "../context/userContext";
import firebase from "../firebase/clientApp";
import "firebase/auth";
import { signOut } from "../utils/signOut";
import { verifyEmail } from "../utils/verifyEmail";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
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

export default function Verification() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();
  const router = useRouter();

  const classes = useStyles();
  useEffect(() => {
    if (!loadingUser) {
      if (user) {
        const email_verified = firebase.auth().currentUser.emailVerified;
        if (email_verified) {
          router.push("/");
        }
      } else {
        router.push("/login");
      }
    }
  }, [loadingUser, user]);

  return (
    <div className="container">
      <Head>
        <title>email verification</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Please verify your email to be able to submit suggestions, upvote
              and comment
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={async () => {
                  await verifyEmail();
                  router.push("/");
                }}
              >
                send verification email again
              </Button>
              <Button
                className={classes.submit}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => router.push("/")}
              >
                Go to home page
              </Button>
              <Button
                className={classes.submit}
                fullWidth
                variant="contained"
                color="primary"
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
              >
                Log out
              </Button>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
