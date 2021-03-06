import { useUser } from "../context/userContext";
import EditIcon from "@material-ui/icons/Edit";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteSuggestion } from "../utils/deleteSuggestion";
import {
  upvoteSuggestion,
  RemoveUpvoteSuggestion,
} from "../utils/upvoteSuggestion";
import { useRouter } from "next/router";

export const Buttons = ({ sug, sugId }) => {
  const router = useRouter();
  const { loadingUser, user } = useUser();

  let upvoteButton = (
    <ThumbUpAltIcon onClick={() => upvoteSuggestion(sugId, user.uid)} />
  );
  if (sug && sug.usersWhoLikedItIds.includes(user.uid)) {
    upvoteButton = (
      <ThumbUpAltIcon
        style={{ color: "blue" }}
        onClick={() => RemoveUpvoteSuggestion(sugId, user.uid)}
      />
    );
  }

  return (
    <>
      {user && user.uid === sug.author && (
        <div>
          <span style={{ paddingLeft: "10px", cursor: "pointer" }}>
            <EditIcon onClick={() => router.push(`/edit/${sugId}`)} />
          </span>
          <span style={{ paddingLeft: "10px", cursor: "pointer" }}>
            <DeleteIcon
              onClick={() => {
                deleteSuggestion(sugId);
                router.push("/");
              }}
            />
          </span>
        </div>
      )}
      {user && (
        <span
          style={{ marginLeft: "auto", marginRight: "20px", cursor: "pointer" }}
        >
          {upvoteButton}
        </span>
      )}
    </>
  );
};
