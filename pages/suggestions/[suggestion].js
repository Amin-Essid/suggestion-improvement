import Head from "next/head";
import Link from "next/link";
import { Container, Paper } from "@material-ui/core";
import { Buttons } from "../../components/buttons";

import { getSuggestion } from "../../fetchData/getSuggestion";
import { getUserData } from "../../fetchData/getUserData";
import Header from "../../components/header";
import { useUser } from "../../context/userContext";
import Comments from "../../components/comments";
import Footer from "../../components/footer";

export default function SSRPage({ data }) {
  const { sug, suggestion, userData } = data;
  const { loadingUser, user } = useUser();
  let date = new Date(sug.createdAt.seconds * 1000).toDateString();
  console.log(date);
  return (
    <>
      <Head>
        <title>suggestion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <Container style={{ marginTop: "100px" }}>
          <Paper
            style={{
              padding: "10px",
              marginTop: "10px",
            }}
          >
            <div>
              <h2>{sug.title}</h2>
            </div>

            <div style={{ display: "flex" }}>
              <div>
                <span
                  style={{ paddingRight: "10px", textDecoration: "underline" }}
                >
                  {sug.department}
                </span>
                |
                <span
                  style={{ paddingLeft: "10px", textDecoration: "underline" }}
                >
                  {sug.category}
                </span>
              </div>
              <Buttons sug={sug} sugId={suggestion} ssr={true} />
              {user ? (
                <div>{`⇫${sug.upvotes}`}</div>
              ) : (
                <div style={{ marginLeft: "auto" }}>{`⇫${sug.upvotes}`}</div>
              )}
            </div>
            <div>
              <p>{sug.description}</p>
              <p
                style={{ fontStyle: "italic", fontSize: "13px" }}
              >{`Created on ${date} by ${userData.username}`}</p>
            </div>
          </Paper>
          {/* {user && <CommentField suggestion={suggestion} />} */}
          <Comments sug={sug} suggestion={suggestion} />
        </Container>
      </main>
      <Footer />
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
  let userData = await getUserData(sug.author);
  userData = JSON.parse(JSON.stringify(userData));
  return { props: { data: { sug, suggestion, userData } } };
};
