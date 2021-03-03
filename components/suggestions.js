import { Container } from "@material-ui/core";
import Suggestion from "../components/suggestion";

export const Suggestions = ({ suggestions }) => {
  console.log(suggestions);

  return (
    <Container maxWidth="sm">
      {suggestions &&
        suggestions.map((sug) => {
          return <Suggestion sug={sug} key={sug.id} />;
        })}
    </Container>
  );
};
