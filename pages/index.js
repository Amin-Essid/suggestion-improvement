import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import firebase from "../firebase/clientApp";
import Header from "../components/header";
import { Container, Paper } from "@material-ui/core";
import { getAllSuggestions } from "../fetchData/getAllSuggestions";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Suggestion from "../components/suggestion";
import { Suggestions } from "../components/suggestions";

// export default function Home({ suggestions }) {
//   const fknSug = suggestions.map((sug) => (
//     <div key={sug.title}>
//       <h2>{sug.title}</h2>
//       <p>{sug.author}</p>
//       {/* <p>{sug.createdAt.toDate()}</p> */}
//     </div>
//   ));
//   return (
//     <div className="container">
//       <Head>
//         <title>Home</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main>
//         <Header />
//         {fknSug}
//       </main>
//     </div>
//   );
// }

// export const getServerSideProps = async ({ params }) => {
//   const suggestions = await getAllSuggestions();
//   console.log(suggestions);

//   if (!suggestions) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       suggestions: suggestions.map((suggestion) =>
//         JSON.parse(JSON.stringify(suggestion))
//       ),
//     },
//   };
// };

export default function Home() {
  const db = firebase.firestore();
  const suggestionsRef = db.collection("posts");
  const query = suggestionsRef.orderBy("createdAt").limit(25);

  const [suggestions] = useCollectionData(query, { idField: "id" });
  console.log(suggestions);
  return (
    <div className="container">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <Container style={{ marginTop: "100px" }}>
          {suggestions &&
            suggestions.map((sug) => (
              <Paper key={sug.id}>
                <h2>{sug.title}</h2>
                <p>{sug.department}</p>
                <p>{sug.category}</p>
                {/* <p>{sug.createdAt.toDate()}</p> */}
              </Paper>
            ))}
        </Container>
      </main>
    </div>
  );
}
