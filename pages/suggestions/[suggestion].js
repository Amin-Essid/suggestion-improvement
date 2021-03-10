import Head from "next/head";
import Link from "next/link";
import { Container, Paper } from "@material-ui/core";
import { Buttons } from "../../components/buttons";
import Comments from "../../components/Comments";

import { getSuggestion } from "../../fetchData/getSuggestion";
import { getUserData } from "../../fetchData/getUserData";
import Header from "../../components/header";
import { useUser } from "../../context/userContext";
export default function SSRPage({ data }) {
  const { sug, suggestion, userData } = data;
  console.log(sug);
  const { loadingUser, user } = useUser();
  return (
    <div>
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
              <div style={{ marginLeft: "auto" }}>{sug.upvotes}</div>
            </div>
            <div>
              <p>{sug.description}</p>
              <p
                style={{ fontStyle: "italic", fontSize: "13px" }}
              >{`by ${userData.username}`}</p>
            </div>
          </Paper>
          {/* {user && <CommentField suggestion={suggestion} />} */}
          <Comments sug={sug} suggestion={suggestion} />
        </Container>
      </main>
    </div>
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
