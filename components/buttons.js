import { useUser } from "../context/userContext";
import EditIcon from "@material-ui/icons/Edit";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteSuggestion } from "../utils/deleteSuggestion";
import { useRouter } from "next/router";

export const Buttons = ({ sug, sugId }) => {
  const router = useRouter();
  const { loadingUser, user } = useUser();

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
        <span style={{ marginLeft: "auto", marginRight: "20px" }}>
          <ThumbUpAltIcon onClick={() => console.log("upvote")} />
        </span>
      )}
    </>
  );
};
