import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  Paper,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
//   import { Link as RouterLink } from "react-router-dom";
import { default as RouterLink } from "next/link";
import { useUser } from "../context/userContext";
import { signOut } from "../utils/signOut";
import { useRouter } from "next/router";

export default function Suggestion({ sug }) {
  console.log(sug.title);
  return (
    <Paper>
      <h2>{sug.title}</h2>
      <p>{sug.author}</p>
      {/* <p>{sug.createdAt.toDate()}</p> */}
    </Paper>
  );
}
