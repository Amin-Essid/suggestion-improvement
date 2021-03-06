import Head from "next/head";
import Link from "next/link";
import { Container, Paper } from "@material-ui/core";
import { Buttons } from "../../components/buttons";

import { getSuggestion } from "../../fetchData/getSuggestion";

export default function SSRPage({ data }) {
  const { sug, suggestion } = data;
  console.log(sug);

  return (
    <div className="container">
      <Head>
        <title>suggestion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
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
                <span style={{ paddingRight: "10px" }}>{sug.department}</span>|
                <span style={{ paddingLeft: "10px", cursor: "pointer" }}>
                  {sug.category}
                </span>
              </div>
              <Buttons sug={sug} sugId={suggestion} />
            </div>
          </Paper>
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
  return { props: { data: { sug, suggestion } } };
};
