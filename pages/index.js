import Head from "next/head";
import Link from "next/link";
import { useUser } from "../context/userContext";
import firebase from "../firebase/clientApp";
import Header from "../components/header";
import { Container, Paper } from "@material-ui/core";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { Buttons } from "../components/buttons";

export default function Home() {
  const router = useRouter();
  const db = firebase.firestore();
  const suggestionsRef = db.collection("posts");
  const query = suggestionsRef.orderBy("createdAt").limit(25);

  const [suggestions] = useCollectionData(query, { idField: "id" });
  const { loadingUser, user } = useUser();
  console.log(suggestions);
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <Container style={{ marginTop: "100px" }}>
          {!suggestions && <div>LOADING ...</div>}
          {suggestions &&
            suggestions.map((sug) => (
              <div key={sug.id}>
                <Paper
                  style={{
                    padding: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Link href={`/suggestions/${sug.id}`}>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <h2>{sug.title}</h2>
                    </div>
                  </Link>
                  <div style={{ display: "flex" }}>
                    <div>
                      <span style={{ paddingRight: "10px" }}>
                        {sug.department}
                      </span>
                      |
                      <span style={{ paddingLeft: "10px" }}>
                        {sug.category}
                      </span>
                    </div>
                    <Buttons sug={sug} sugId={sug.id} />
                    <div style={{ marginLeft: "auto" }}>{sug.upvotes}</div>
                  </div>
                </Paper>
              </div>
            ))}
        </Container>
      </main>
    </div>
  );
}
