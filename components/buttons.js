import { useUser } from "../context/userContext";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteSuggestion } from "../utils/deleteSuggestion";
import {
  upvoteSuggestion,
  RemoveUpvoteSuggestion,
} from "../utils/upvoteSuggestion";
import { useRouter } from "next/router";
import EjectIcon from "@material-ui/icons/Eject";
import Button from "@material-ui/core/Button";
import { useState } from "react";

export const Buttons = ({ sug, sugId, ssr, upvotes }) => {
  const router = useRouter();
  const { loadingUser, user } = useUser();
  // const [deletedSug, setDeletedSug] = useState("");
  const [popupClass, setPopupClass] = useState("overlay_hidden");

  const refreshData = () => {
    router.replace(router.asPath);
  };

  let upvoteButton = (
    <EjectIcon onClick={() => upvoteSuggestion(sugId, user.uid)} />
  );
  if (sug && ssr) {
    upvoteButton = (
      <EjectIcon
        onClick={async () => {
          await upvoteSuggestion(sugId, user.uid);
          refreshData();
        }}
      />
    );
  }
  if (sug && sug.usersWhoLikedItIds.includes(user?.uid)) {
    upvoteButton = (
      <EjectIcon
        style={{ color: "blue" }}
        onClick={() => RemoveUpvoteSuggestion(sugId, user.uid)}
      />
    );
  }

  if (sug && sug.usersWhoLikedItIds.includes(user?.uid) && ssr) {
    upvoteButton = (
      <EjectIcon
        style={{ color: "blue" }}
        onClick={async () => {
          await RemoveUpvoteSuggestion(sugId, user.uid);
          refreshData();
        }}
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
              onClick={async () => {
                // await deleteSuggestion(sugId);
                // setDeletedSug(sugId);
                setPopupClass("overlay");
                // console.log(popupClass, deletedSug);
                // router.push("/");
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

      <div className={popupClass}>
        <div className="popup">
          <h2>are you sure you want to delete this suggestion</h2>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              await deleteSuggestion(sugId);
              // setDeletedSug("");
              // setPopupClass("overlay_hidden");
              router.push("/");
            }}
          >
            YES
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: "20px" }}
            onClick={async () => {
              // setDeletedSug("");
              setPopupClass("overlay_hidden");
              // router.push("/");
            }}
          >
            NO
          </Button>
        </div>
      </div>
    </>
  );
};
