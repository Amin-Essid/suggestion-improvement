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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
//   import { Link as RouterLink } from "react-router-dom";
import { default as RouterLink } from "next/link";
import { useUser } from "../context/userContext";
import { signOut } from "../utils/signOut";
import { useRouter } from "next/router";

const headersData = [
  {
    label: "Explore",
    href: "/",
  },
  {
    label: "Post a suggestion",
    href: "/create_suggestion",
  },
  {
    label: "FAQs",
    href: "/",
  },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));

export default function Header() {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const { loadingUser, user } = useUser();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const router = useRouter();

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {mainLogo}
        <div>
          {getMenuButtons()}
          {getAuthButtons()}
        </div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>
            {getDrawerChoices()}
            {getAuthButtons()}
          </div>
        </Drawer>

        <div>{mainLogo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          color="inherit"
          style={{ textDecoration: "none" }}
          key={label}
          onClick={() => router.push(href)}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const mainLogo = (
    <Link
      color="inherit"
      style={{ textDecoration: "none", cursor: "pointer" }}
      onClick={() => router.push("/")}
    >
      <Typography variant="h6" component="h1" className={logo}>
        Improvement
      </Typography>
    </Link>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          key={label}
          color="inherit"
          onClick={() => router.push(href)}
          className={menuButton}
        >
          {label}
        </Button>
      );
    });
  };

  const getAuthButtons = () => {
    if (user) {
      return (
        <Button variant="contained" color="primary" onClick={() => signOut()}>
          <MenuItem>Logout</MenuItem>
        </Button>
      );
    } else {
      return (
        <>
          <Button
            color="primary"
            onClick={() => router.push("/login")}
            className={menuButton}
            variant="contained"
          >
            <MenuItem>Login</MenuItem>
          </Button>
          <Button
            color="primary"
            onClick={() => router.push("/register")}
            className={menuButton}
            variant="contained"
          >
            <MenuItem>Sign up</MenuItem>
          </Button>
        </>
      );
    }
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
